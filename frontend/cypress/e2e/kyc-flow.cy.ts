describe('KYC Flow', () => {
  beforeEach(() => {
    cy.connectWallet();
    cy.visit('/kyc');
    cy.waitForPageLoad();
  });

  it('should load KYC page', () => {
    cy.contains('KYC Verification').should('be.visible');
  });

  it('should display KYC requirements', () => {
    cy.contains('Identity Verification').should('be.visible');
    cy.contains('Document Upload').should('be.visible');
  });

  it('should show progress stepper', () => {
    cy.get('[data-testid="progress-stepper"]').should('be.visible');
  });

  it('should handle form validation', () => {
    // Test empty form submission
    cy.get('button[type="submit"]').click();
    cy.contains('required').should('be.visible');
  });

  it('should accept valid form data', () => {
    // Fill out basic information
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.get('input[name="dateOfBirth"]').type('1990-01-01');

    // Select country
    cy.get('select[name="country"]').select('United States');

    // Submit form
    cy.get('button[type="submit"]').click();

    // Should move to next step
    cy.contains('Document Upload').should('be.visible');
  });

  it('should handle document upload', () => {
    // Navigate to document upload step
    cy.contains('Document Upload').click();

    // Mock file upload
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample-id.jpg', { force: true });

    cy.contains('Upload successful').should('be.visible');
  });

  it('should complete KYC verification', () => {
    // Complete all steps
    cy.contains('Complete Verification').click();
    cy.contains('KYC Verified').should('be.visible');
  });

  it('should show verification status', () => {
    cy.visit('/dashboard');
    cy.contains('KYC Status: Verified').should('be.visible');
  });
});