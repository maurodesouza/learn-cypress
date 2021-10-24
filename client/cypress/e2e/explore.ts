/// <reference path="../support/index.d.ts" />

import {
  priceFields,
  genreFields,
  platformFields,
  sortFields
} from '../../src/utils/filter/fields'

describe('Explore Page', () => {
  before(() => {
    cy.visit('/games')
  })

  it('should render filters columns', () => {
    cy.findByRole('heading', { name: /sort by price/i }).should('exist')
    cy.findByRole('heading', { name: /^price/i }).should('exist')

    cy.findByRole('heading', { name: /platform/i }).should('exist')
    cy.findByRole('heading', { name: /genres/i }).should('exist')

    const fields = [...priceFields, ...genreFields, ...platformFields, ...sortFields]

    fields.map(({ label }) => cy.findByText(label).should('exist'))
  })
})
