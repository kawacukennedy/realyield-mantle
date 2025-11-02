describe('Wallet Connection', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForPageLoad();
  });

  it('should show connect wallet button initially', () => {
    cy.contains('Connect Wallet').should('be.visible');
  });

  it('should open wallet modal when connect button is clicked', () => {
    cy.contains('Connect Wallet').click();
    cy.contains('Connect Wallet').should('be.visible'); // Modal title
    cy.contains('MetaMask').should('be.visible');
    cy.contains('WalletConnect').should('be.visible');
  });

  it('should close wallet modal when clicking outside', () => {
    cy.contains('Connect Wallet').click();
    cy.get('body').click(0, 0); // Click outside modal
    cy.contains('MetaMask').should('not.be.visible');
  });

  it('should handle wallet connection (mock)', () => {
    cy.connectWallet();
    // In a real scenario, this would trigger actual wallet connection
    cy.contains('Connected').should('be.visible');
  });

  it('should navigate to dashboard when connected', () => {
    cy.connectWallet();
    cy.contains('Dashboard').click();
    cy.url().should('include', '/dashboard');
  });

  it('should persist wallet connection state', () => {
    cy.connectWallet();
    cy.reload();
    cy.contains('Connected').should('be.visible');
  });
});