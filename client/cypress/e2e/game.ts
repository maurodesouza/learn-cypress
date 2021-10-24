/// <reference path="../support/index.d.ts" />

describe('Game Page', () => {
  it('should render home sections', () => {
    cy.visit('/game/cyberpunk-2077')

    cy.getByDataCy('game-info').within(() => {
      cy.findByRole('heading', { name: /cyberpunk 2077/i }).should('exist')
      cy.findByText(/^cyberpunk 2077 is an open-world/i).should('exist')

      cy.findByText(/\$199.90/i).should('exist')
      cy.findByRole('button', { name: /add to cart/i }).should('exist')
    })

    cy.findAllByRole('button', { name: /thumb \-/i }).should('have.length.gt', 0)

    cy.getByDataCy('content').within(() => {
      cy.findByRole('heading', { name: 'Description' })
    }).children().should('have.length.at.least', 2)
  })
})
