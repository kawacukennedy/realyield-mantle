describe('Vault Operations', () => {
  beforeEach(() => {
    cy.connectWallet();
    cy.visit('/dashboard');
    cy.waitForPageLoad();
  });

  it('should display available vaults', () => {
    cy.contains('Available Vaults').should('be.visible');
    cy.get('[data-testid="vault-card"]').should('have.length.greaterThan', 0);
  });

  it('should show vault details', () => {
    cy.get('[data-testid="vault-card"]').first().within(() => {
      cy.contains('APY').should('be.visible');
      cy.contains('TVL').should('be.visible');
      cy.contains('Risk').should('be.visible');
      cy.contains('Deposit').should('be.visible');
    });
  });

  it('should navigate to vault detail page', () => {
    cy.get('[data-testid="vault-card"]').first().find('button').contains('Deposit').click();
    cy.url().should('include', '/vault/');
  });

  it('should display vault information on detail page', () => {
    cy.visit('/vault/1'); // Assuming vault ID 1 exists
    cy.contains('Vault Details').should('be.visible');
    cy.contains('Deposit Amount').should('be.visible');
    cy.contains('Available Balance').should('be.visible');
  });

  it('should handle deposit flow', () => {
    cy.visit('/vault/1');

    // Enter deposit amount
    cy.get('input[name="amount"]').type('1000');

    // Approve transaction
    cy.contains('Approve').click();
    cy.contains('Transaction Approved').should('be.visible');

    // Confirm deposit
    cy.contains('Deposit').click();
    cy.contains('Deposit Successful').should('be.visible');
  });

  it('should handle withdrawal flow', () => {
    cy.visit('/vault/1');

    // Switch to withdraw tab
    cy.contains('Withdraw').click();

    // Enter withdrawal amount
    cy.get('input[name="withdrawAmount"]').type('500');

    // Confirm withdrawal
    cy.contains('Withdraw').click();
    cy.contains('Withdrawal Successful').should('be.visible');
  });

  it('should display transaction history', () => {
    cy.visit('/vault/1');
    cy.contains('Transaction History').should('be.visible');
    cy.get('[data-testid="transaction-item"]').should('have.length.greaterThan', 0);
  });

  it('should show yield earnings', () => {
    cy.visit('/dashboard');
    cy.contains('Total Earnings').should('be.visible');
    cy.contains('Yield Generated').should('be.visible');
  });

  it('should handle vault filtering', () => {
    cy.visit('/dashboard');

    // Filter by APY
    cy.get('select[name="sort"]').select('APY: High to Low');
    cy.get('[data-testid="vault-card"]').first().should('contain', 'APY');

    // Filter by risk
    cy.get('select[name="risk"]').select('Low');
    cy.get('[data-testid="vault-card"]').each(($card) => {
      cy.wrap($card).should('contain', 'Low');
    });
  });
});