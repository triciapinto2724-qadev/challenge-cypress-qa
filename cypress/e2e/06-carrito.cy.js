describe('Eliminar un producto del carrito', () => {
  it('deja el carrito vacío al eliminar el producto agregado', () => {
    cy.agregarProductoAlCarrito()

    cy.get('[data-test="product-remove"]')
      .should('have.length', 1)
      .and('be.visible')
      .click()

    cy.get('[data-test="product-title"]')
      .should('not.exist')

    cy.contains('The cart is empty')
      .should('be.visible')
  })
})