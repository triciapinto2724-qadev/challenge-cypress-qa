describe('Pruebas de Inicio de Sesión', () => {
  beforeEach(() => {
    cy.fixture('users').as('users')
  })

  it('rechaza el login con contraseña incorrecta', function() {
    cy.visitar('/auth/login')
    cy.login(this.users.wrongPassword)

    cy.get('[data-test="login-error"]')
      .should('be.visible')
      .and('not.be.empty')

    cy.location('href')
      .should('include', '/auth/login')
  })
})