describe('Formulario de contacto', () => {
  it('envía un mensaje válido y muestra la confirmación', () => {
    cy.fixture('contact').then((contacto) => {
      cy.visitar('/contact')

      cy.llenarContacto(contacto)

      cy.get('[data-test="contact-submit"]')
        .should('be.visible')
        .and('be.enabled')
        .click()

      cy.contains(
        'Thanks for your message! We will contact you shortly.'
      ).should('be.visible')
    })
  })
})