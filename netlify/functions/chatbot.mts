import type { Config, Context } from '@netlify/functions'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic()

async function fetchShopifyProducts(query: string): Promise<string> {
  const shopifyEndpoint =
    Netlify.env.get('SHOPIFY_STOREFRONT_HOST') ||
    'https://mock-shop-graphql.netlify.app/api/graphql'
  const accessToken =
    Netlify.env.get('SHOPIFY_STOREFRONT_PUBLIC_ACCESS_TOKEN') || 'dummy-token-for-development'

  const graphqlQuery = `
    query Products($first: Int!, $query: String) {
      products(first: $first, query: $query) {
        edges {
          node {
            id
            title
            description
            handle
            productType
            priceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  src
                }
              }
            }
          }
        }
      }
    }
  `

  const response = await fetch(shopifyEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': accessToken,
    },
    body: JSON.stringify({
      query: graphqlQuery,
      variables: { first: 10, query: query || null },
    }),
  })

  const data = await response.json()
  const products = data?.data?.products?.edges || []

  if (products.length === 0) {
    return 'No products found matching the search criteria.'
  }

  return products
    .map(
      (edge: any) =>
        `- **${edge.node.title}** — $${parseFloat(edge.node.priceRange.maxVariantPrice.amount).toFixed(2)} ${edge.node.priceRange.maxVariantPrice.currencyCode}${edge.node.description ? `\n  ${edge.node.description.substring(0, 150)}` : ''}${edge.node.handle ? `\n  Link: /products/${edge.node.handle}` : ''}`
    )
    .join('\n')
}

export default async (req: Request, context: Context) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const { message, history } = await req.json()

  if (!message || typeof message !== 'string') {
    return new Response(JSON.stringify({ error: 'Message is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Fetch products from Shopify to give the AI context
  const productInfo = await fetchShopifyProducts(message)

  const systemPrompt = `You are a friendly and helpful shopping assistant for an athletic shoe store. You help customers find the right products based on their needs.

Here are the current products available in the store:
${productInfo}

Guidelines:
- Be concise and helpful in your responses.
- When recommending products, include the product name, price, and a link to the product page (e.g., /products/handle).
- If a customer asks about something not related to athletic shoes or the store, politely redirect them.
- If no products match what the customer is looking for, let them know and suggest browsing the full collection.
- Keep responses short — 2-3 sentences is ideal unless the customer asks for more detail.`

  const messages: Array<{ role: 'user' | 'assistant'; content: string }> = []

  // Add conversation history if provided
  if (Array.isArray(history)) {
    for (const entry of history) {
      if (entry.role === 'user' || entry.role === 'assistant') {
        messages.push({ role: entry.role, content: entry.content })
      }
    }
  }

  messages.push({ role: 'user', content: message })

  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 512,
    system: systemPrompt,
    messages,
  })

  const assistantMessage =
    response.content[0].type === 'text' ? response.content[0].text : 'Sorry, I could not generate a response.'

  return new Response(JSON.stringify({ response: assistantMessage }), {
    headers: { 'Content-Type': 'application/json' },
  })
}

export const config: Config = {
  path: '/api/chatbot',
}
