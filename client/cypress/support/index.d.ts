// load type definitions from Cypress module
/// <reference types="cypress" />

type ShowcaseAttributes = {
  name: string
  hightlight?: boolean
}

type SignUpAttributes = {
  username: string
  email: string
  password: string
}

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to get elements by data-cy
     * @example cy.getByDataCy()
    */
     getByDataCy(selector: string, ...args: any[]): Chainable<Element>


    /**
     * Custom command to check banner in page
     * @example cy.shouldRenderBanner()
    */
    shouldRenderBanner(): Chainable<Element>


    /**
     * Custom command to check showcase in page
     * @example cy.shouldRenderBanner()
    */
    shouldRenderShowcase(attr: ShowcaseAttributes): Chainable<Element>

    /**
     * Custom command to find some price in scope and check if value is less that price
     * @example cy.shouldPriceBeLessOrEqualThan(100)
    */
     shouldPriceBeLessOrEqualThan(value: number): Chainable<Element>

    /**
     * Custom command to find some price in scope and check if value is greater that price
     * @example cy.shouldPriceBeGreaterOrEqualThan(100)
    */
     shouldPriceBeGreaterOrEqualThan(value: number): Chainable<Element>

    /**
     * Custom command to get filter and check game card price
     * @example cy.shouldFilterByPrice(100)
    */
    shouldFilterByPrice(value: number): Chainable<Element>

    /**
     * Custom command to sign up user
     * @example cy.signUp({ username, password, email })
    */
    signUp(attr: SignUpAttributes): Chainable<Element>
  }
}
