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

    cy.getByDataCy('game-details').within(() => {
      cy.findByRole('heading', { name: /game details/i })

      cy.findByRole('heading', { name: /developer/i })
      cy.findByRole('heading', { name: /publisher/i })

      cy.findByRole('heading', { name: /release date/i })
      cy.findByRole('heading', { name: /rating/i })

      cy.findByRole('heading', { name: /platforms/i })
      cy.findByRole('heading', { name: /genres/i })

      cy.findAllByText(/cd projekt red/i).should('have.length', 2)
      cy.findByText(/dec 8, 2020/i).should('exist')

      cy.findByText(/free/i).should('exist')
      cy.findByText(/card game \/ action \/ sci-fi/i).should('exist')

      cy.findByRole('img', { name: /windows/i }).should('exist')
    })

    cy.shouldRenderShowcase({ name: 'Upcoming Games', hightlight: true  })
    cy.shouldRenderShowcase({ name: 'Recomendados', hightlight: false  })
  })
})
