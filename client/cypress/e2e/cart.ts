/// <reference path="../support/index.d.ts" />

describe('Home Page', () => {
  it('should add/remove games from cart by game card', () => {
    cy.visit('/')

    const addedGames = []

    cy.getByDataCy('game-card').each((el, index) => {
      if (index > 1) return

      cy.wrap(el).within(() => {
        cy.findAllByRole('heading')
          .first()
          .invoke('text')
          .then(text => addedGames.push(text))

        cy.findByRole('button', { name: /add to cart/i }).click()
      })
    })

    .then(() => {
      cy.findAllByLabelText(/cart items/i)
        .first()
        .should('have.text', addedGames.length)
        .click()

      cy.getByDataCy('cart-list')
        .within(() => {
          addedGames.forEach(game => cy.findByRole('heading', { name: game }).should('exist'))
        })
        .children()
        .should('have.length', addedGames.length)

      cy.findAllByLabelText(/cart items/i)
        .first()
        .click()
    })

    cy.findAllByRole('button', { name: /remove from cart/i })
      .each(el => cy.wrap(el).click())

    cy.findAllByLabelText(/cart items/i).should('not.exist')
    cy.findAllByLabelText(/shopping cart/i).first().click()

    cy.findByRole('heading', { name: /your cart is empty/i }).should('exist')
  })
})
