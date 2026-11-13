describe('Compra exitosa', () => {
  it('permite comprar un producto y confirmar la orden', () => {
    cy.fixture('users').then((users) => {
      cy.fixture('checkout').then((checkout) => {
        cy.agregarProductoAlCarrito()

        cy.get('[data-test="proceed-1"]')
          .should('be.visible')
          .and('be.enabled')
          .click()

        cy.login(users.validUser)

        cy.get('[data-test="proceed-2"]')
          .should('be.visible')
          .and('be.enabled')
          .click()

        cy.completarDireccion(checkout)

        cy.get('[data-test="proceed-3"]')
          .should('be.visible')
          .and('be.enabled')
          .click()

        cy.get('[data-test="payment-method"]')
          .should('be.visible')
          .select(checkout.paymentMethod)

        // Completar los campos de cuenta si la opción de pago los requiere
        cy.get('body').then(($body) => {
          if ($body.find('[data-test="account-name"]').length > 0) {
            cy.get('[data-test="account-name"]')
              .should('be.visible')
              .clear()
              .type(checkout.accountName || 'Cuenta de Prueba');
          }
          if ($body.find('[data-test="account-number"]').length > 0) {
            cy.get('[data-test="account-number"]')
              .should('be.visible')
              .clear()
              .type(checkout.accountNumber || '123456789');
          }
        });
        
        // Ahora el botón se habilitará correctamente y se podrá hacer clic
        cy.get('[data-test="finish"]')
          .should('be.visible')
          .and('be.enabled')
          .click()

        cy.contains('Payment was successful')
          .should('be.visible')

        // En el flujo de dos confirmaciones, el primer clic procesa
        // el pago y el segundo confirma definitivamente la orden.
        cy.get('[data-test="finish"]')
          .should('be.visible')
          .and('be.enabled')
          .click()

        cy.get('#order-confirmation')
          .should('be.visible')
          .and('not.have.text', '')
      })
    })
  })
})