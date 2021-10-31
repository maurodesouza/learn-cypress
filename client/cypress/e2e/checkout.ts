/// <reference path="../support/index.d.ts" />

import { createUser, User } from '../support/generate'

describe('Checkout', () => {
  describe('Free games', () => {
    let user: User

    before(() => {
      user = createUser()
    })

    it('should by free games', () => {
      cy.visit('/sign-up')

      cy.signUp(user)
      cy.urlShouldBeEqualTo('/')

      cy.findByRole('link', { name: /explore/i }).click()
      cy.urlShouldBeEqualTo('/games')

      cy.findByText(/free/i).click()
      cy.url().should('contain', 'price_lte=0')

      cy.getByDataCy('game-card').eq(0).within(() => {
        cy.findByRole('button', { name: /add to cart/i }).click()
      })

      cy.findAllByLabelText(/cart items/i)
        .first()
        .should('have.text', 1)
        .click()

      cy.getByDataCy('cart-list').next().within(() => {
        cy.findByText(/buy it now/i).click()
      })

      cy.wait(2000)

      cy.findByText(/only free games, click buy and enjoy!/i).should('exist')
      cy.findByRole('button', { name: /buy now/i }).click()

      cy.urlShouldBeEqualTo('/success')
      cy.findByRole('heading', { name: /Your purchase was successful!/i }).should('exist')
    })

    it('should show games in order page', () => {
      cy.visit('/profile/orders')
      cy.urlShouldBeEqualTo('/sign-in?callbackUrl=/profile/orders')

      cy.signIn(user.email, user.password)
      cy.urlShouldBeEqualTo('/profile/orders')

      cy.getByDataCy('game-item').should('have.length', 1)
    })
  })

  describe('Paid games', () => {
    let user: User

    before(() => {
      user = createUser()
    })

    it('should by free games', () => {
      cy.visit('/sign-up')

      cy.signUp(user)
      cy.urlShouldBeEqualTo('/')

      cy.findByRole('link', { name: /explore/i }).click()
      cy.urlShouldBeEqualTo('/games')

      cy.findByText(/highest to lowest/i).click()
      cy.location('href').should('contain', 'sort=price%3Adesc')

      cy.getByDataCy('game-card').eq(0).within(() => {
        cy.findByRole('button', { name: /add to cart/i }).click()
      })

      cy.findAllByLabelText(/cart items/i)
        .first()
        .should('have.text', 1)
        .click()

      cy.getByDataCy('cart-list').next().within(() => {
        cy.findByText(/buy it now/i).click()
      })

      cy.wait(2000)

      cy.findByRole('button', { name: /buy now/i }).should('have.attr', 'disabled')

      cy.fillElementsInput('cardNumber', '4242424242424242')
      cy.fillElementsInput('cardExpiry', '1040')
      cy.fillElementsInput('cardCvc', '103')

      cy.findByRole('button', { name: /buy now/i }).click()

      cy.urlShouldBeEqualTo('/success')
      cy.findByRole('heading', { name: /Your purchase was successful!/i }).should('exist')
    })

    it('should show games in order page', () => {
      cy.visit('/profile/orders')
      cy.urlShouldBeEqualTo('/sign-in?callbackUrl=/profile/orders')

      cy.signIn(user.email, user.password)
      cy.urlShouldBeEqualTo('/profile/orders')

      cy.getByDataCy('game-item').should('have.length', 1)
    })
  })
})
