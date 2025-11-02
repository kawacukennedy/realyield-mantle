describe('Landing Page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForPageLoad();
  });

  it('should load the landing page successfully', () => {
    cy.contains('RealYield').should('be.visible');
    cy.contains('Compliant On-Chain Yield Vaults').should('be.visible');
  });

  it('should display hero section with call-to-action', () => {
    cy.contains('Connect Wallet').should('be.visible');
    cy.contains('Tokenize real-world cash flows').should('be.visible');
  });

  it('should display live vault statistics', () => {
    cy.contains('Live Vault Statistics').should('be.visible');
    cy.contains('TVL').should('be.visible');
    cy.contains('APY').should('be.visible');
    cy.contains('Depositors').should('be.visible');
    cy.contains('Yield Distributed').should('be.visible');
  });

  it('should display how it works section', () => {
    cy.contains('How it Works').should('be.visible');
    cy.contains('Tokenize Assets').should('be.visible');
    cy.contains('Pool in Vaults').should('be.visible');
    cy.contains('Earn Yield').should('be.visible');
  });

  it('should display security and compliance section', () => {
    cy.contains('Security & Compliance').should('be.visible');
    cy.contains('KYC Required').should('be.visible');
    cy.contains('ZK Privacy').should('be.visible');
    cy.contains('Custodial Settlement').should('be.visible');
  });

  it('should have working navigation links', () => {
    cy.contains('Dashboard').should('be.visible').click();
    cy.url().should('include', '/dashboard');

    cy.visit('/'); // Go back
    cy.contains('Create Asset').should('be.visible');
    cy.contains('Vaults').should('be.visible');
  });

  it('should display footer with links', () => {
    cy.contains('© 2024 RealYield').should('be.visible');
    cy.contains('Powered by').should('be.visible');
    cy.contains('Mantle Network').should('be.visible');
  });

  it('should be responsive on mobile viewport', () => {
    cy.viewport('iphone-6');
    cy.contains('RealYield').should('be.visible');
    cy.contains('Connect Wallet').should('be.visible');
  });
});