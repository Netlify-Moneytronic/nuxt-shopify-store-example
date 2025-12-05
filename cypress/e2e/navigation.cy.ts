describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
    // Set viewport to mobile size
    cy.viewport('iphone-x');
    // Wait for page to be fully loaded and hydrated
    cy.wait(2000); // Wait for initial page load
    cy.get('nav').should('be.visible');
  });

  it('should show mobile menu button when in mobile view', () => {
    cy.get('button[aria-label="Open menu"]').should('be.visible');
  });

  it('should open and close mobile menu when clicking menu button', () => {
    // Wait for button and ensure it's ready
    cy.get('button[aria-label="Open menu"]')
      .should('exist')
      .and('be.visible')
      .and('not.be.disabled')
      .click();

    // Wait for menu to appear and check its state
    cy.get('.mobile-menu')
      .should('exist')
      .and('be.visible')
      .and('have.class', 'translate-x-0')
      .and('not.have.class', '-translate-x-full')
      .within(() => {
        cy.contains('Mens').should('be.visible');
        cy.contains('Womens').should('be.visible');
        cy.contains('a', 'Accessories').should('be.visible');
        cy.contains('a', 'Sale').should('be.visible');
      });

    // Click close button
    cy.get('button[aria-label="Close menu"]').should('exist').and('be.visible').click();

    // Verify menu is closed
    cy.get('.mobile-menu').should('not.exist');

    // Verify open button is back
    cy.get('button[aria-label="Open menu"]').should('exist').and('be.visible');
  });
});
