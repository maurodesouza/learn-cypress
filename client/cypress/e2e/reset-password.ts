/// <reference path="../support/index.d.ts" />

describe('Reset password', () => {
  it('should fill the input and receive an success message', () => {
    cy.visit('/reset-password')

    cy.findByPlaceholderText(/^password/i).type('123')
    cy.findByPlaceholderText(/^confirm password/i).type('123456')

    cy.findByRole('button', { name: /reset password/i }).click()
    cy.findByText(/confirm password does not match with password/i).should('exist')
  })

  it('should show error if code is not valid', () => {
    cy.intercept('POST', '**/auth/reset-password', res => {
      res.reply({
        status: 400,
        body: {
          error: 'Bad Request',
          message: [
            {
              messages: [
                {
                  message: 'Incorrect params provided'
                }
              ]
            }
          ]
        }
      })
    })

    cy.visit('/reset-password')

    cy.findByPlaceholderText(/^password/i).type('123456')
    cy.findByPlaceholderText(/^confirm password/i).type('123456')

    cy.findByRole('button', { name: /reset password/i }).click()
    cy.findByText(/incorrect params provided/i).should('exist')
  })
})
