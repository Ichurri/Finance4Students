describe('Inicio de Sesión', () => {

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

});

describe('Gestión de Gastos', () => {

  beforeEach(() => {
    cy.visit('index.html');
    cy.get('#username').type('estudiante');
    cy.get('#password').type('12345');
    cy.get('#login-form').submit();
  });

  it('Debería registrar un gasto y mostrarlo en el historial', () => {
    cy.get('#cantidad-gasto').type('100');
    cy.get('#descripcion-gasto').type('Compra de libros');
    cy.get('#btn-agregar').click(); // Usar el botón "Agregar Gasto"

    cy.get('#cuerpo-historial-gastos').should('contain', '100');
    cy.get('#cuerpo-historial-gastos').should('contain', 'Compra de libros');
  });

  it('Debería permitir editar un gasto y actualizar el historial', () => {
    // Primero, registrar un gasto
    cy.get('#cantidad-gasto').type('100');
    cy.get('#descripcion-gasto').type('Compra de libros');
    cy.get('#btn-agregar').click();

    // Verificar que el gasto se muestra en el historial
    cy.get('#cuerpo-historial-gastos').should('contain', '100');
    cy.get('#cuerpo-historial-gastos').should('contain', 'Compra de libros');

    // Editar el gasto
    cy.get('.editar-btn').first().click(); // Suponiendo que el botón de editar tiene la clase 'editar-btn'

    // Verificar que el botón "Actualizar" aparece y "Agregar" desaparece
    cy.get('#btn-actualizar').should('be.visible');
    cy.get('#btn-agregar').should('not.be.visible');

    // Cambiar los valores del gasto
    cy.get('#cantidad-gasto').clear().type('150');
    cy.get('#descripcion-gasto').clear().type('Compra de materiales');
    cy.get('#btn-actualizar').click(); // Usar el botón "Actualizar Gasto"

    // Verificar que el gasto ha sido actualizado en el historial
    cy.get('#cuerpo-historial-gastos').should('contain', '150');
    cy.get('#cuerpo-historial-gastos').should('contain', 'Compra de materiales');

    // Verificar que el botón "Actualizar" desaparece y "Agregar" reaparece
    cy.get('#btn-actualizar').should('not.be.visible');
    cy.get('#btn-agregar').should('be.visible');
  });

  it('Debería mantener el saldo total actualizado después de editar un gasto', () => {
    // Registrar un ingreso
    cy.get('#cantidad-ingreso').type('500');
    cy.get('#descripcion-ingreso').type('Mesada');
    cy.get('#form-ingreso').submit();
    cy.get('#saldo-total').should('contain', '500');

    // Registrar un gasto
    cy.get('#cantidad-gasto').type('200');
    cy.get('#descripcion-gasto').type('Compra de libros');
    cy.get('#btn-agregar').click();
    cy.get('#saldo-total').should('contain', '300'); // 500 - 200 = 300

    // Editar el gasto
    cy.get('.editar-btn').first().click();
    cy.get('#cantidad-gasto').clear().type('100');
    cy.get('#descripcion-gasto').clear().type('Compra de cuadernos');
    cy.get('#btn-actualizar').click();

    // Verificar que el saldo total se ha actualizado
    cy.get('#saldo-total').should('contain', '400'); // 500 - 100 = 400

    // Verificar que el botón "Actualizar" desaparece y "Agregar" reaparece
    cy.get('#btn-actualizar').should('not.be.visible');
    cy.get('#btn-agregar').should('be.visible');
  });

});

describe('Gestión de Ingresos', () => {

  beforeEach(() => {
    cy.visit('index.html');
    cy.get('#username').type('estudiante');
    cy.get('#password').type('12345');
    cy.get('#login-form').submit();
  });

  it('Debería registrar un ingreso y mostrarlo en el historial', () => {
    cy.get('#cantidad-ingreso').type('500');
    cy.get('#descripcion-ingreso').type('Mesada');
    cy.get('#form-ingreso').submit();

    cy.get('#cuerpo-historial-ingresos').should('contain', '500');
    cy.get('#cuerpo-historial-ingresos').should('contain', 'Mesada');
  });

});

describe('Cálculo de Saldo Total', () => {

  beforeEach(() => {
    cy.visit('index.html');
    cy.get('#username').type('estudiante');
    cy.get('#password').type('12345');
    cy.get('#login-form').submit();
  });

  it('Debería actualizar el saldo total al registrar gastos e ingresos', () => {
    cy.get('#cantidad-ingreso').type('500');
    cy.get('#descripcion-ingreso').type('Mesada');
    cy.get('#form-ingreso').submit();
    cy.get('#saldo-total').should('contain', '500');

    cy.get('#cantidad-gasto').type('200');
    cy.get('#descripcion-gasto').type('Compra de libros');
    cy.get('#form-gasto').submit();
    cy.get('#saldo-total').should('contain', '300'); // 500 - 200 = 300
  });

});

describe('Gestión de Objetivos de Ahorro', () => {

  beforeEach(() => {
    cy.visit('index.html');
    cy.get('#username').type('estudiante');
    cy.get('#password').type('12345');
    cy.get('#login-form').submit();
  });

  it('Debería crear un objetivo de ahorro y mostrarlo', () => {
    cy.get('#descripcion-objetivo').type('Viaje');
    cy.get('#cantidad-objetivo').type('1000');
    cy.get('#form-objetivo-ahorro').submit();

    cy.get('#objetivo-creado').should('contain', 'Viaje');
    cy.get('#objetivo-creado').should('contain', '1000');
  });
});

describe('Gestión de Categorias', () => {

  beforeEach(() => {
    cy.visit('index.html');
    cy.get('#username').type('estudiante');
    cy.get('#password').type('12345');
    cy.get('#login-form').submit();
  });

  it('Debería crear una categoria y mostrarla', () => {
    cy.get('#nombre-categoria').type('Comidas');
    cy.get('#form-categorias').submit();
    cy.get('#lista-categorias').should('contain', 'Comidas');
  });
});
