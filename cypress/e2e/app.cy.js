// cypress/integration/app.spec.js

describe('Finanzas para Estudiantes', () => {

  beforeEach(() => {
    // Visitar la página principal antes de cada prueba
    cy.visit('index.html');
  });

  it('Debería iniciar sesión correctamente', () => {
    // Llenar el formulario de login
    cy.get('#username').type('estudiante');
    cy.get('#password').type('12345');
    cy.get('#login-form').submit();

    // Verificar que la aplicación muestre el contenido después del login
    cy.get('#app-container').should('be.visible');
  });

  it('Debería mostrar error con credenciales incorrectas', () => {
    // Llenar el formulario de login con credenciales incorrectas
    cy.get('#username').type('usuarioIncorrecto');
    cy.get('#password').type('contraseniaIncorrecta');
    cy.get('#login-form').submit();

    // Verificar que aparezca una alerta con el mensaje de error
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Credenciales incorrectas');
    });
  });

  it('Debería registrar un gasto y mostrarlo en el historial', () => {
    // Iniciar sesión primero
    cy.get('#username').type('estudiante');
    cy.get('#password').type('12345');
    cy.get('#login-form').submit();

    // Registrar un gasto
    cy.get('#cantidad-gasto').type('100');
    cy.get('#descripcion-gasto').type('Compra de libros');
    cy.get('#form-gasto').submit();

    // Verificar que el gasto aparezca en el historial
    cy.get('#cuerpo-historial-gastos').should('contain', '100');
    cy.get('#cuerpo-historial-gastos').should('contain', 'Compra de libros');
  });

  it('Debería registrar un ingreso y mostrarlo en el historial', () => {
    // Iniciar sesión primero
    cy.get('#username').type('estudiante');
    cy.get('#password').type('12345');
    cy.get('#login-form').submit();

    // Registrar un ingreso
    cy.get('#cantidad-ingreso').type('500');
    cy.get('#descripcion-ingreso').type('Mesada');
    cy.get('#form-ingreso').submit();

    // Verificar que el ingreso aparezca en el historial
    cy.get('#cuerpo-historial-ingresos').should('contain', '500');
    cy.get('#cuerpo-historial-ingresos').should('contain', 'Mesada');
  });

  it('Debería actualizar el saldo total al registrar gastos e ingresos', () => {
    // Iniciar sesión primero
    cy.get('#username').type('estudiante');
    cy.get('#password').type('12345');
    cy.get('#login-form').submit();

    // Registrar un ingreso y verificar el saldo
    cy.get('#cantidad-ingreso').type('500');
    cy.get('#descripcion-ingreso').type('Mesada');
    cy.get('#form-ingreso').submit();
    cy.get('#saldo-total').should('contain', '500');

    // Registrar un gasto y verificar el saldo actualizado
    cy.get('#cantidad-gasto').type('200');
    cy.get('#descripcion-gasto').type('Compra de libros');
    cy.get('#form-gasto').submit();
    cy.get('#saldo-total').should('contain', '300'); // 500 - 200 = 300
  });

  it('Debería crear un objetivo de ahorro y mostrarlo', () => {
    // Iniciar sesión primero
    cy.get('#username').type('estudiante');
    cy.get('#password').type('12345');
    cy.get('#login-form').submit();

    // Crear un objetivo de ahorro
    cy.get('#descripcion-objetivo').type('Viaje');
    cy.get('#cantidad-objetivo').type('1000');
    cy.get('#form-objetivo-ahorro').submit();

    // Verificar que el objetivo de ahorro se muestre
    cy.get('#objetivo-creado').should('contain', 'Viaje');
    cy.get('#objetivo-creado').should('contain', '1000');
  });
});
