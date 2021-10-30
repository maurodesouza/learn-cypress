/// <reference path="../support/index.d.ts" />

import { createUser } from '../support/generate'

describe('User', () => {
  it('should sign up', () => {
    cy.visit('/sign-up')

    const user = createUser()
    cy.signUp(user)

    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
    cy.findByText(user.username).should('exist')
  })

  it('should sign in', () => {
    cy.visit('/sign-in')

    cy.findByPlaceholderText(/email/i).type('e2e@wongames.com')
    cy.findByPlaceholderText(/^password/i).type('cypress')

    cy.findByRole('button', { name: /sign in now/i }).click()

    cy.findByText(/cypress/i).should('exist').click()
    cy.findByText(/sign out/i).click()

    cy.findByRole('link', { name: /sign in/i }).should('exist')
    cy.findByText(/cypress/i).should('not.exist')
  })
})
