describe('Inicio de sesión con datos incorrectos', () => {
  it('rechaza el login con contraseña incorrecta', () => {
    cy.fixture('users').then((users) => {
      cy.visitar('/auth/login')

      cy.login(users.wrongPassword)

      cy.get('[data-test="login-error"]')
        .should('be.visible')
        .invoke('text')
        .should('not.be.empty')

      cy.location('href')
        .should('include', '/auth/login')

      cy.get('[data-test="email"]')
        .should('be.visible')

      cy.get('[data-test="login-submit"]')
        .should('be.visible')
    })
  })
})