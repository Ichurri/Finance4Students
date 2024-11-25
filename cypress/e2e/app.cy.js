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

  it('Debería permitir editar un ingreso y actualizar el historial', () => {
    cy.get('#cantidad-ingreso').type('500');
    cy.get('#descripcion-ingreso').type('Mesada');
    cy.get('#form-ingreso').submit();

    cy.get('#cuerpo-historial-ingresos').should('contain', '500');
    cy.get('#cuerpo-historial-ingresos').should('contain', 'Mesada');

    cy.get('.editar-btn-ingreso').first().click();

    cy.get('#cantidad-ingreso').clear().type('600');
    cy.get('#descripcion-ingreso').clear().type('Pago freelance');
    cy.get('#btn-actualizar-ingreso').click();

    cy.get('#cuerpo-historial-ingresos').should('contain', '600');
    cy.get('#cuerpo-historial-ingresos').should('contain', 'Pago freelance');
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

    cy.get('#lista-objetivos').should('contain', 'Viaje');
    cy.get('#lista-objetivos').should('contain', '1000');
  });
});

describe('Gestión de Objetivos de Ahorro - Crear y Editar', () => {
  beforeEach(() => {
    // Navega a la página y realiza el login
    cy.visit('index.html');
    cy.get('#username').type('estudiante');
    cy.get('#password').type('12345');
    cy.get('#login-form').submit();

    // Crea un objetivo de ahorro inicial
    cy.get('#descripcion-objetivo').type('Viaje');
    cy.get('#cantidad-objetivo').type('1000');
    cy.get('#form-objetivo-ahorro').submit();
  });

  it('Debería crear un objetivo de ahorro y luego editarlo', () => {
    // Localiza el botón de editar del primer objetivo
    cy.get('#lista-objetivos li')
      .first()
      .find('.editar-objetivo')
      .click();

    // Asegura que el formulario está poblado con los datos del objetivo a editar
    cy.get('#descripcion-objetivo').should('have.value', 'Viaje');
    cy.get('#cantidad-objetivo').should('have.value', '1000');

    // Cambia los valores en el formulario
    cy.get('#descripcion-objetivo').clear().type('Recorrido a Europa');
    cy.get('#cantidad-objetivo').clear().type('2000');

    // Asegura que el botón ahora dice "Editar Objetivo"
    cy.get('#btn-guardar-objetivo').should('have.text', 'Editar Objetivo');

    // Guarda los cambios
    cy.get('#form-objetivo-ahorro').submit();

    // Verifica que los cambios se reflejan en la lista
    cy.get('#lista-objetivos').should('contain', 'Recorrido a Europa');
    cy.get('#lista-objetivos').should('contain', '2000');
    cy.get('#lista-objetivos').should('not.contain', 'Viaje');
    cy.get('#lista-objetivos').should('not.contain', '1000');
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

  it('Debería crear varias categorias y mostrarlas', () => {
    cy.get('#nombre-categoria').type('Comidas');
    cy.get('#form-categorias').submit();
    cy.get('#nombre-categoria').type('Bebidas');
    cy.get('#form-categorias').submit();
    cy.get('#nombre-categoria').type('Salidas');
    cy.get('#form-categorias').submit();
    cy.get('#lista-categorias').should('contain', 'Comidas');
    cy.get('#lista-categorias').should('contain', 'Bebidas');
    cy.get('#lista-categorias').should('contain', 'Salidas');
  });
});

describe('Categorias en Gastos', () => {

  beforeEach(() => {
    cy.visit('index.html');
    cy.get('#username').type('estudiante');
    cy.get('#password').type('12345');
    cy.get('#login-form').submit();
  });

  it('Debería crear una categoria y anadirla a un gasto', () => {
    cy.get('#nombre-categoria').type('Comidas');
    cy.get('#form-categorias').submit();
    cy.get('#cantidad-gasto').type('100');
    cy.get('#descripcion-gasto').type('Hamburguesa');
    cy.get('#selector-categoria').select('Comidas');
    cy.get('#btn-agregar').click();
    cy.get('#cuerpo-historial-gastos').should('contain', 'Comidas');
  });
});
