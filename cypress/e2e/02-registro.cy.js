describe('Validaciones del formulario de registro', () => {
  const camposObligatorios = [
    'first-name', 'last-name', 'dob', 'address', 'postcode', 
    'city', 'state', 'country', 'phone', 'email', 'password'
  ]

  beforeEach(() => {
    cy.visitar('/auth/register')
  })

  it('muestra errores al enviar el formulario vacío', () => {
    cy.get('[data-test="register-submit"]').click()

    camposObligatorios.forEach((campo) => {
      cy.get(`[data-test="${campo}-error"]`)
        .should('be.visible')
        .invoke('text')
        .should('not.be.empty')
    })

    cy.location('href').should('include', '/auth/register')
  })
})