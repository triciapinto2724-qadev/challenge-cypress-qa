describe('Módulo de Búsqueda y Filtrado de Catálogo', () => {

  it('Debe localizar exitosamente productos mediante consulta de texto libre', () => {
    // 1. Ingreso a la página principal del sistema
    cy.visitar('/');

    // 2. Extraemos dinámicamente un nombre de producto visible en el catálogo actual
    cy.get('[data-test="product-name"]')
      .should('have.length.greaterThan', 0)
      .first()
      .invoke('text')
      .then((nombreExtraido) => {
        const palabraClave = nombreExtraido.trim();

        // Aseguramos que el término de búsqueda no esté vacío
        expect(palabraClave, 'Término extraído del catálogo').not.to.be.empty;

        // Interceptamos la llamada al servicio de búsqueda del API
        cy.intercept('GET', '**/products/search*').as('peticionBusqueda');

        // 3. Escribimos el término en la barra de búsqueda y ejecutamos la acción
        cy.get('[data-test="search-query"]')
          .should('be.visible')
          .clear()
          .type(palabraClave, { parseSpecialCharSequences: false });

        cy.get('[data-test="search-submit"]')
          .should('be.enabled')
          .click();

        // 4. Sincronizamos la respuesta de la red y verificamos su estatus HTTP
        cy.wait('@peticionBusqueda')
          .its('response.statusCode')
          .should('eq', 200);

        // 5. Validamos que los resultados de la interfaz coincidan con el término buscado
        cy.get('[data-test="product-name"]')
          .should('have.length.greaterThan', 0)
          .should(($listaResultados) => {
            const existeCoincidencia = [...$listaResultados].some((elemento) =>
              elemento.textContent.trim().toLowerCase().includes(palabraClave.toLowerCase())
            );

            expect(
              existeCoincidencia,
              `El catálogo muestra al menos un ítem relacionado con "${palabraClave}"`
            ).to.be.true;
          });
      });
  });

});