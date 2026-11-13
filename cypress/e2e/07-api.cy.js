describe('Pruebas de API', () => {
  it('obtiene productos y un token de acceso', () => {
    // Definimos la URL de la API directamente sin depender de env/config
    const apiUrl = 'https://api-with-bugs.practicesoftwaretesting.com'

    // 1. Petición GET para la lista de productos
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

    // 2. Petición POST para el login por API usando el fixture
    cy.fixture('users').then((users) => {
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