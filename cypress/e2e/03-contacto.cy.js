describe('Módulo de Contacto y Atención al Cliente', () => {

  beforeEach(() => {
    // Aseguramos la ruta inicial de forma limpia
    cy.visit('/#/contact');
  });

  it('Debe permitir el envío exitoso de un mensaje corporativo válido', () => {
    // Cargamos los datos del fixture usando un alias para mayor prolijidad
    cy.fixture('contact').as('datosMensaje');

    cy.get('@datosMensaje').then((info) => {
      // Completamos los campos del formulario
      cy.llenarContacto(info);

      // Verificamos y ejecutamos el botón de envío
      cy.get('[data-test="contact-submit"]')
        .should('be.visible')
        .and('be.enabled')
        .click();

      // Validación final del mensaje de éxito del sistema
      const textoConfirmacion = 'Thanks for your message! We will contact you shortly.';
      cy.contains(textoConfirmacion)
        .should('be.visible')
        .and('have.length.gt', 0);
    });
  });

});