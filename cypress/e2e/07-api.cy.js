describe('Prueba de API', () => {
  it('obtiene productos y un token de acceso', () => {
    const apiUrl = Cypress.env('apiUrl')

    cy.fixture('users').then((users) => {
      cy.request({
        method: 'GET',
        url: `${apiUrl}/products`,
      }).then((response) => {
        expect(response.status).to.eq(200)

        expect(response.body)
          .to.have.property('data')
          .that.is.an('array')
          .and.is.not.empty
      })

      cy.request({
        method: 'POST',
        url: `${apiUrl}/users/login`,
        body: {
          email: users.validUser.email,
          password: users.validUser.password,
        },
        log: false,
      }).then((response) => {
        expect(response.status).to.eq(200)

        expect(response.body)
          .to.have.property('access_token')
          .that.is.a('string')
          .and.is.not.empty
      })
    })
  })
})