describe('Finanzas para Estudiantes', () => {

    beforeEach(() => {
      cy.visit('index.html');
    });
  
    it('Debería iniciar sesión correctamente', () => {
      cy.get('#username').type('estudiante');
      cy.get('#password').type('12345');
      cy.get('#login-form').submit();
  
      cy.get('#app-container').should('be.visible');
    });
  
    it('Debería mostrar error con credenciales incorrectas', () => {
      cy.get('#username').type('usuarioIncorrecto');
      cy.get('#password').type('contraseniaIncorrecta');
      cy.get('#login-form').submit();
  
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Credenciales incorrectas');
      });
    });
  
    it('Debería registrar un gasto y mostrarlo en el historial', () => {
      cy.get('#username').type('estudiante');
      cy.get('#password').type('12345');
      cy.get('#login-form').submit();
  
      cy.get('#cantidad-gasto').type('100');
      cy.get('#descripcion-gasto').type('Compra de libros');
      cy.get('#form-gasto').submit();
  
      cy.get('#cuerpo-historial-gastos').should('contain', '100');
      cy.get('#cuerpo-historial-gastos').should('contain', 'Compra de libros');
    });
  
    it('Debería registrar un ingreso y mostrarlo en el historial', () => {
      cy.get('#username').type('estudiante');
      cy.get('#password').type('12345');
      cy.get('#login-form').submit();
  
      cy.get('#cantidad-ingreso').type('500');
      cy.get('#descripcion-ingreso').type('Mesada');
      cy.get('#form-ingreso').submit();
  
      cy.get('#cuerpo-historial-ingresos').should('contain', '500');
      cy.get('#cuerpo-historial-ingresos').should('contain', 'Mesada');
    });
  
    it('Debería actualizar el saldo total al registrar gastos e ingresos', () => {
      cy.get('#username').type('estudiante');
      cy.get('#password').type('12345');
      cy.get('#login-form').submit();
  
      cy.get('#cantidad-ingreso').type('500');
      cy.get('#descripcion-ingreso').type('Mesada');
      cy.get('#form-ingreso').submit();
      cy.get('#saldo-total').should('contain', '500');
  
      cy.get('#cantidad-gasto').type('200');
      cy.get('#descripcion-gasto').type('Compra de libros');
      cy.get('#form-gasto').submit();
      cy.get('#saldo-total').should('contain', '300'); // 500 - 200 = 300
    });
  
    it('Debería crear un objetivo de ahorro y mostrarlo', () => {
      cy.get('#username').type('estudiante');
      cy.get('#password').type('12345');
      cy.get('#login-form').submit();
  
      cy.get('#descripcion-objetivo').type('Viaje');
      cy.get('#cantidad-objetivo').type('1000');
      cy.get('#form-objetivo-ahorro').submit();
  
      cy.get('#objetivo-creado').should('contain', 'Viaje');
      cy.get('#objetivo-creado').should('contain', '1000');
    });
  });
  