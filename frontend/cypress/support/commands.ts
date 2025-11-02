// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/// <reference types="cypress" />

// Custom command to connect wallet (mock)
Cypress.Commands.add('connectWallet', () => {
  cy.window().then((win) => {
    // Mock wallet connection for testing
    win.localStorage.setItem('wallet-connected', 'true');
  });
});

// Custom command to disconnect wallet
Cypress.Commands.add('disconnectWallet', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('wallet-connected');
  });
});

// Custom command to wait for page load
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible');
});

// Custom command to check if element is in viewport
Cypress.Commands.add('isInViewport', { prevSubject: 'element' }, (subject) => {
  const bottom = Cypress.$(cy.state('window')).height();
  const rect = subject[0].getBoundingClientRect();

  expect(rect.top).to.be.lessThan(bottom);
  expect(rect.bottom).to.be.greaterThan(0);
});

declare global {
  namespace Cypress {
    interface Chainable {
      connectWallet(): Chainable<void>;
      disconnectWallet(): Chainable<void>;
      waitForPageLoad(): Chainable<void>;
      isInViewport(): Chainable<void>;
    }
  }
}