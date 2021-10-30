/// <reference path="../support/index.d.ts" />

import { createUser } from '../support/generate'

describe('User', () => {
  it('should sign up', () => {
    cy.visit('/sign-up')

    const user = createUser()
    cy.signUp(user)

    cy.urlShouldBeEqualTo('/')
    cy.findByText(user.username).should('exist')
  })

  it('should sign in and sign out', () => {
    cy.visit('/sign-in')

    cy.signIn()
    cy.urlShouldBeEqualTo('/')

    cy.findByText(/cypress/i).should('exist').click()
    cy.findByText(/sign out/i).click()

    cy.findByRole('link', { name: /sign in/i }).should('exist')
    cy.findByText(/cypress/i).should('not.exist')
  })

  it('should sign in the user and redirect to the page that it was defined previously', () => {
    cy.visit('/profile/me')
    cy.urlShouldBeEqualTo('/sign-in?callbackUrl=/profile/me')

    cy.signIn()
    cy.urlShouldBeEqualTo('/profile/me')

    cy.findByPlaceholderText(/username/i).should('have.value', 'cypress')
    cy.findByPlaceholderText(/e-mail/i).should('have.value', 'e2e@wongames.com')
  })
})
