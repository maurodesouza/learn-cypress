/// <reference path="../support/index.d.ts" />

describe('Reset password', () => {
  it('should fill the input and receive an success message', () => {
    cy.intercept('POST', '**/auth/forgot-password', res => {
      res.reply({
        status: 200,
        body: { ok: true }
      })

      expect(res.body.email).to.be.eq('a@a.com')
    })

    cy.visit('/forgot-password')

    cy.findByPlaceholderText(/email/i).type('a@a.com')
    cy.findByRole('button', { name: /send email/i }).click()

    cy.findByText(/you just received an email!/i).should('exist')
  })

  it('should fill the input with an invalid email and receive an error', () => {
    cy.intercept('POST', '**/auth/forgot-password', res => {
      res.reply({
        status: 400,
        body: {
          error: 'Bad Request',
          message: [
            {
              messages: [
                {
                  message: 'This email does not exist'
                }
              ]
            }
          ]
        }
      })
    })

    cy.visit('/forgot-password')

    cy.findByPlaceholderText(/email/i).type('a@a.com')
    cy.findByRole('button', { name: /send email/i }).click()

    cy.findByText(/this email does not exist/i).should('exist')
  })
})
