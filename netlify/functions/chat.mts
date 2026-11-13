import type { Config, Context } from '@netlify/functions';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

const MODEL = 'claude-haiku-4-5';
const MAX_TOOL_ROUNDS = 4;

/**
 * The assistant is grounded in a shoe store. When a shopper's request is
 * ambiguous, it always falls back to searching for shoes, and it must use the
 * search_products tool for any claim about products, prices, or availability.
 */
const SYSTEM_PROMPT = `You are the shopping assistant for an athletic shoe store that sells running and performance footwear.

Rules:
- Customers are here to shop for shoes. If a request is vague, generic, or does not name a specific product category, ALWAYS search for and recommend shoes by default.
- For ANY question about products, prices, sizes, descriptions, or availability, you MUST call the search_products tool to get real, current catalog data. Never invent products, prices, or stock status.
- When you have search results, give a short, friendly recommendation (2-4 sentences). Mention price and whether the item is in stock. Do not output raw URLs or markdown tables — the storefront renders the matching products visually beneath your message.
- If the catalog returns nothing for a query, say so plainly and suggest searching for shoes instead.
- Keep replies concise and helpful.`;

const SEARCH_TOOL: Anthropic.Tool = {
  name: 'search_products',
  description:
    'Search the live Shopify catalog for shoes and footwear. Returns real product data: title, description, price, in-stock status, and available sizes/variants. Call this for every product-related question. Leave the query empty to list featured shoes.',
  input_schema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description:
          'Search keywords, e.g. "trail", "running", "Bondi", "waterproof". Leave empty or omit to return featured shoes.',
      },
      limit: {
        type: 'integer',
        description: 'Maximum number of products to return. Defaults to 6, max 10.',
      },
    },
  },
};

const PRODUCTS_GQL = `
  query AssistantSearch($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          productType
          tags
          availableForSale
          images(first: 1) { edges { node { src } } }
          priceRange {
            minVariantPrice { amount currencyCode }
          }
          variants(first: 10) {
            edges { node { title availableForSale price { amount currencyCode } } }
          }
        }
      }
    }
  }
`;

interface StorefrontProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  images: { edges: Array<{ node: { src: string } }> };
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  variants: {
    edges: Array<{
      node: { title: string; availableForSale: boolean; price: { amount: string; currencyCode: string } };
    }>;
  };
}

/** A product trimmed for the chat UI to render as a card. */
interface ProductCard {
  title: string;
  handle: string;
  link: string;
  image: string;
  price: string;
  currency: string;
  available: boolean;
  productType: string;
  description: string;
  sizes: string[];
}

function formatPrice(amount: string): string {
  const n = parseFloat(amount);
  return Number.isFinite(n) ? n.toFixed(2) : amount;
}

async function searchShopify(rawQuery: string | undefined, rawLimit: number | undefined): Promise<ProductCard[]> {
  const host = Netlify.env.get('SHOPIFY_STOREFRONT_HOST');
  const token = Netlify.env.get('SHOPIFY_STOREFRONT_PUBLIC_ACCESS_TOKEN');

  if (!host || !token) {
    throw new Error('Shopify Storefront credentials are not configured.');
  }

  const limit = Math.min(Math.max(rawLimit ?? 6, 1), 10);
  // Default every search toward shoes: an empty query lists the (all-shoe)
  // catalog, and we never narrow away from footwear.
  const query = rawQuery && rawQuery.trim().length > 0 ? rawQuery.trim() : null;

  const res = await fetch(host, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query: PRODUCTS_GQL, variables: { first: limit, query } }),
  });

  if (!res.ok) {
    throw new Error(`Shopify responded with ${res.status}`);
  }

  const json = (await res.json()) as {
    data?: { products?: { edges?: Array<{ node: StorefrontProduct }> } };
    errors?: Array<{ message: string }>;
  };

  const edges = json.data?.products?.edges ?? [];

  return edges.map(({ node }) => {
    const sizes = node.variants.edges
      .map((v) => v.node.title)
      .filter((t) => t && t.toLowerCase() !== 'default title');

    return {
      title: node.title,
      handle: node.handle,
      link: `/products/${node.handle}`,
      image: node.images.edges[0]?.node.src ?? '',
      price: formatPrice(node.priceRange.minVariantPrice.amount),
      currency: node.priceRange.minVariantPrice.currencyCode,
      available: node.availableForSale,
      productType: node.productType,
      description: node.description,
      sizes,
    } satisfies ProductCard;
  });
}

/** Compact representation handed back to the model as a tool result. */
function toolResultText(products: ProductCard[]): string {
  if (products.length === 0) {
    return 'No products matched that search.';
  }

  return JSON.stringify(
    products.map((p) => ({
      title: p.title,
      productType: p.productType,
      price: `${p.price} ${p.currency}`,
      inStock: p.available,
      sizes: p.sizes,
      description: p.description.slice(0, 400),
    })),
  );
}

type IncomingMessage = { role: 'user' | 'assistant'; content: string };

export default async (req: Request, _context: Context) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  let body: { messages?: IncomingMessage[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const history = Array.isArray(body.messages) ? body.messages : [];
  const messages: Anthropic.MessageParam[] = history
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content }));

  if (messages.length === 0) {
    return Response.json({ error: 'No messages provided.' }, { status: 400 });
  }

  // Products surfaced during this turn, deduped by handle, for the UI to render.
  const collected = new Map<string, ProductCard>();

  try {
    let response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      tools: [SEARCH_TOOL],
      messages,
    });

    let rounds = 0;
    while (response.stop_reason === 'tool_use' && rounds < MAX_TOOL_ROUNDS) {
      rounds += 1;
      messages.push({ role: 'assistant', content: response.content });

      const toolResults: Anthropic.ToolResultBlockParam[] = [];
      for (const block of response.content) {
        if (block.type !== 'tool_use' || block.name !== 'search_products') continue;

        const input = (block.input ?? {}) as { query?: string; limit?: number };
        try {
          const products = await searchShopify(input.query, input.limit);
          for (const p of products) collected.set(p.handle, p);
          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: toolResultText(products),
          });
        } catch (err) {
          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: `Search failed: ${(err as Error).message}`,
            is_error: true,
          });
        }
      }

      messages.push({ role: 'user', content: toolResults });

      response = await anthropic.messages.create({
        model: MODEL,
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        tools: [SEARCH_TOOL],
        messages,
      });
    }

    const reply = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim();

    return Response.json({
      reply: reply || 'Sorry, I could not find an answer to that. Try asking about our shoes!',
      products: Array.from(collected.values()),
    });
  } catch (err) {
    console.error('chat function error', err);
    return Response.json(
      { error: 'The assistant is unavailable right now. Please try again.' },
      { status: 500 },
    );
  }
};

export const config: Config = {
  path: '/api/chat',
};
