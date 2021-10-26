// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import '@testing-library/cypress/add-commands';

Cypress.Commands.add('getByDataCy', (selector, ...args) => cy.get(`[data-cy="${selector}"]`, ...args))


Cypress.Commands.add('shouldRenderBanner', () => {
  cy.get('.slick-slider').within(() => {
    cy.findByRole('heading', { name: /cyberpunk 2077/i })
    cy.findByRole('link', { name: /buy now/i })

    cy.get('.slick-dots > :nth-child(2) > button').click()
    cy.wait(500)

    cy.findByRole('heading', { name: /swat 4: gold edition/i })
    cy.findByRole('link', { name: /buy now/i })

    cy.get('.slick-dots > :nth-child(3) > button').click()
    cy.wait(500)

    cy.findByRole('heading', { name: /metal gear!/i })
    cy.findByRole('link', { name: /browse games/i })
  })
})

Cypress.Commands.add('shouldRenderShowcase', ({ name, hightlight = false }) => {
  cy.getByDataCy(name).within(() => {
    cy.findByRole('heading', { name }).should('exist')

    cy.getByDataCy('hightlight').should(hightlight ? 'exist' : 'not.exist')

    if (hightlight) {
      cy.getByDataCy('hightlight').within(() => {
        cy.findByRole('link').should('have.attr', 'href')
      })
    }

    cy.getByDataCy('game-card').should('have.length.gt', 0)
  })
})

Cypress.Commands.add('shouldPriceBeLessOrEqualThan', value => {
  cy
    .findByText(/^\$\d+(\.\d{1,2})/)
    .invoke('text')
    .then($el => $el.replace('$', ''))
    .then(parseFloat)
    .should('be.lte', value)
})

Cypress.Commands.add('shouldPriceBeGreaterOrEqualThan', value => {
  cy
    .findByText(/^\$\d+(\.\d{1,2})/)
    .invoke('text')
    .then($el => $el.replace('$', ''))
    .then(parseFloat)
    .should('be.gte', value)
})

Cypress.Commands.add('shouldFilterByPrice', value => {
  const label = value > 0 ? `Under $${value}` : 'Free'

  cy.findByLabelText(label).click()
  cy.location('href').should('contain', `price_lte=${value}`)

  cy.getByDataCy('game-card')
    .first()
    .within(() => {
      cy.shouldPriceBeLessOrEqualThan(value)
    })
    .last()
    .within(() => {
      cy.shouldPriceBeLessOrEqualThan(value)
    })
})

Cypress.Commands.add('signUp', ({ username, password, email }) => {
  cy.findByPlaceholderText(/username/i).type(username)
  cy.findByPlaceholderText(/email/i).type(email)

  cy.findByPlaceholderText(/^password/i).type(password)
  cy.findByPlaceholderText(/confirm password/i).type(password)

  cy.findByRole('button', { name: /sign up now/i }).click()
})
