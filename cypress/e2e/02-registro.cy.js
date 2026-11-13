describe('Validaciones del formulario de registro', () => {
  it('muestra errores al enviar el formulario vacío', () => {
    cy.visitar('/auth/register')

    cy.get('[data-test="register-submit"]')
      .should('be.visible')
      .click()

    const camposObligatorios = [
      'first-name',
      'last-name',
      'dob',
      'address',
      'postcode',
      'city',
      'state',
      'country',
      'phone',
      'email',
      'password',
    ]

    camposObligatorios.forEach((campo) => {
      cy.get(`[data-test="${campo}-error"]`)
        .should('be.visible')
        .invoke('text')
        .should('not.be.empty')
    })

    cy.location('href')
      .should('include', '/auth/register')

    cy.get('[data-test="register-submit"]')
      .should('be.visible')
  })
})