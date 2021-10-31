/// <reference path="../support/index.d.ts" />

describe('Wishlist', () => {
  it('should add/remove games from wishlist', () => {
    cy.visit('/wishlist')
    cy.urlShouldBeEqualTo('/sign-in?callbackUrl=/wishlist')

    cy.signIn()
    cy.urlShouldBeEqualTo('/wishlist')

    cy.findByRole('heading', { name: /your wishlist is empty/i }).should('exist')

    cy.getByDataCy('game-card')
      .eq(0)
      .within(() => {
        cy.findByLabelText(/add to wishlist/i).should('exist').click()
      })

    cy.findByRole('heading', { name: /your wishlist is empty/i }).should('not.exist')


    cy.getByDataCy('wishlist')
      .children()
      .should('have.length', 1)
      .first()
      .within(() => {
        cy.findByLabelText(/remove from wishlist/i).should('exist').click()
      })

    cy.findByRole('heading', { name: /your wishlist is empty/i }).should('exist')
  })
})
