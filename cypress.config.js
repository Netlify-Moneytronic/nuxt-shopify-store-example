import { defineConfig } from 'cypress';

export default defineConfig({
  pageLoadTimeout: 120000,
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:8888/',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
  video: false,
  screenshotOnRunFailure: true,
});
