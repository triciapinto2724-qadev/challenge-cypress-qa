Cypress.Commands.add('visitar', (ruta = '/') => {
  const path = ruta.startsWith('/') ? ruta : `/${ruta}`

  const destino = Cypress.env('useHashRouting')
    ? `/#${path}`
    : path

  cy.visit(destino)
})

Cypress.Commands.add('login', (usuario) => {
  cy.get('[data-test="email"]')
    .should('be.visible')
    .clear()
    .type(usuario.email)

  cy.get('[data-test="password"]')
    .clear()
    .type(usuario.password, { log: false })

  cy.get('[data-test="login-submit"]')
    .should('be.enabled')
    .click()
})

Cypress.Commands.add('agregarProductoAlCarrito', () => {
  cy.visitar('/')

  cy.get('[data-test="product-name"]')
    .should('have.length.greaterThan', 0)
    .first()
    .should('be.visible')
    .invoke('text')
    .then((texto) => {
      const nombreProducto = texto.trim()

      expect(nombreProducto, 'nombre del producto').not.to.eq('')

      cy.wrap(nombreProducto).as('productoAgregado')
    })

  cy.get('[data-test="product-name"]')
    .first()
    .click()

  cy.get('[data-test="add-to-cart"]')
    .should('be.visible')
    .and('be.enabled')
    .click()

  // Espera a que el contador del carrito refleje el agregado.
  cy.get('[data-test="cart-quantity"]')
    .should('contain.text', '1')

  cy.get('[data-test="nav-cart"]')
    .should('be.visible')
    .click()

  cy.get('@productoAgregado').then((nombreProducto) => {
    cy.get('[data-test="product-title"]')
      .should('have.length', 1)
      .and('contain.text', nombreProducto)
  })
})

Cypress.Commands.add('llenarContacto', (datos) => {
  cy.get('[data-test="first-name"]')
    .clear()
    .type(datos.firstName)

  cy.get('[data-test="last-name"]')
    .clear()
    .type(datos.lastName)

  cy.get('[data-test="email"]')
    .clear()
    .type(datos.email)

  cy.get('[data-test="subject"]')
    .select(datos.subject)

  cy.get('[data-test="message"]')
    .clear()
    .type(datos.message)
})

Cypress.Commands.add('completarDireccion', (datos) => {
  cy.get('[data-test="address"]')
    .clear()
    .type(datos.address)

  cy.get('[data-test="city"]')
    .clear()
    .type(datos.city)

  cy.get('[data-test="state"]')
    .clear()
    .type(datos.state)

  cy.get('[data-test="country"]')
    .clear()
    .type(datos.country)

  cy.get('[data-test="postcode"]')
    .clear()
    .type(datos.postcode)
})