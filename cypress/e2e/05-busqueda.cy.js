describe('Búsqueda de productos', () => {
  it('encuentra productos por un nombre observado en el catálogo', () => {
    cy.visitar('/')

    cy.get('[data-test="product-name"]')
      .should('have.length.greaterThan', 0)
      .first()
      .invoke('text')
      .then((texto) => {
        const termino = texto.trim()

        expect(termino, 'término de búsqueda').not.to.eq('')

        cy.intercept('GET', '**/products/search*')
          .as('buscarProductos')

        cy.get('[data-test="search-query"]')
          .should('be.visible')
          .clear()
          .type(termino, {
            parseSpecialCharSequences: false,
          })

        cy.get('[data-test="search-submit"]')
          .should('be.enabled')
          .click()

        cy.wait('@buscarProductos')
          .its('response.statusCode')
          .should('eq', 200)

        cy.get('[data-test="product-name"]')
          .should('have.length.greaterThan', 0)
          .should(($productos) => {
            const hayCoincidencia = [...$productos].some(
              (producto) =>
                producto.textContent
                  .trim()
                  .toLowerCase()
                  .includes(termino.toLowerCase())
            )

            expect(
              hayCoincidencia,
              `algún resultado contiene "${termino}"`
            ).to.eq(true)
          })
      })
  })
})