// load type definitions from Cypress module
/// <reference types="cypress" />

type ShowcaseAttributes = {
  name: string
  hightlight?: boolean
}

declare namespace Cypress {
  interface Chainable {
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
  }
}
