describe('Finanzas para Estudiantes', () => {

  beforeEach(() => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });
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

  it('Debería crear una nueva categoría', () => {
    cy.get('#username').type('estudiante');
    cy.get('#password').type('12345');
    cy.get('#login-form').submit();

    cy.get('#nombre-categoria').type('Transporte');
    cy.get('#form-categoria').submit();

    cy.get('#lista-categorias').should('contain', 'Transporte');
  });

  it('Debería mostrar un error al intentar crear una categoría duplicada', () => {
    cy.get('#username').type('estudiante');
    cy.get('#password').type('12345');
    cy.get('#login-form').submit();
  
    // Crear la categoría por primera vez
    cy.get('#nombre-categoria').type('Alimentación');
    cy.get('#form-categoria').submit();
  
    // Intentar crear la misma categoría de nuevo
    cy.get('#nombre-categoria').type('Alimentación');
    cy.get('#form-categoria').submit();
  
    // Capturar la alerta y verificar el mensaje
    cy.on('window:alert', (str) => {
      expect(str).to.equal('La categoría ya existe');
    });
  });
  

  it('Debería mostrar un error al intentar crear una categoría sin nombre', () => {
    cy.get('#username').type('estudiante');
    cy.get('#password').type('12345');
    cy.get('#login-form').submit();

    cy.get('#form-categoria').submit();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('El nombre de la categoría no puede estar vacío');
    });
  });
});

describe('Gestión de Gastos con Categorías', () => {
  beforeEach(() => {
    // Visitar la página e iniciar sesión
    cy.visit('index.html');
    cy.get('#username').type('estudiante');
    cy.get('#password').type('12345');
    cy.get('#login-form').submit();
  });

  it('Debería permitir registrar un gasto con categoría seleccionada', () => {
    // Crear una categoría
    cy.get('#nombre-categoria').type('Educación');
    cy.get('#form-categoria').submit();

    // Registrar un gasto con la categoría creada
    cy.get('#cantidad-gasto').type('100');
    cy.get('#descripcion-gasto').type('Compra de libros');
    cy.get('#categoria-gasto').select('Educación');
    cy.get('#form-gasto').submit();

    // Verificar que el gasto aparezca con la categoría correcta
    cy.get('#cuerpo-historial-gastos').should('contain', 'Educación');
    cy.get('#cuerpo-historial-gastos').should('contain', 'Compra de libros');
    cy.get('#cuerpo-historial-gastos').should('contain', '$100');
  });

  it('Debería asignar "Sin Categoría" si no se selecciona ninguna categoría', () => {
    // Registrar un gasto sin seleccionar ninguna categoría
    cy.get('#cantidad-gasto').type('50');
    cy.get('#descripcion-gasto').type('Café');
    cy.get('#form-gasto').submit();

    // Verificar que el gasto se registre con la categoría predeterminada
    cy.get('#cuerpo-historial-gastos').should('contain', 'Sin Categoría');
    cy.get('#cuerpo-historial-gastos').should('contain', 'Café');
    cy.get('#cuerpo-historial-gastos').should('contain', '$50');
  });

  it('Debería mostrar solo las categorías creadas en el select de categorías', () => {
    // Crear categorías
    cy.get('#nombre-categoria').type('Educación');
    cy.get('#form-categoria').submit();

    cy.get('#nombre-categoria').type('Transporte');
    cy.get('#form-categoria').submit();

    // Verificar que solo las categorías creadas estén en el select
    cy.get('#categoria-gasto').find('option').should('have.length', 3); // Sin Categoría + 2 categorías creadas
    cy.get('#categoria-gasto').should('contain', 'Educación');
    cy.get('#categoria-gasto').should('contain', 'Transporte');
    cy.get('#categoria-gasto').should('not.contain', 'Alimentación');
  });

  it('Debería registrar múltiples gastos con diferentes categorías', () => {
    // Crear categorías
    cy.get('#nombre-categoria').type('Educación');
    cy.get('#form-categoria').submit();
  
    cy.get('#nombre-categoria').type('Transporte');
    cy.get('#form-categoria').submit();
  
    // Registrar un gasto con categoría "Educación"
    cy.get('#cantidad-gasto').type('150');
    cy.get('#descripcion-gasto').type('Matricula');
    cy.get('#categoria-gasto').select('Educación');
    cy.get('#form-gasto').submit();
  
    // Verificar que el gasto se haya guardado en localStorage
    cy.window().then((win) => {
      const gastos = JSON.parse(win.localStorage.getItem('gastos'));
      expect(gastos).to.deep.include({ cantidad: 150, descripcion: 'Matricula', categoria: 'Educación' });
    });
  
    // Registrar un gasto con categoría "Transporte"
    cy.get('#cantidad-gasto').type('50');
    cy.get('#descripcion-gasto').type('Taxi');
    cy.get('#categoria-gasto').select('Transporte');
    cy.get('#form-gasto').submit();
  
    // Verificar que ambos gastos estén en localStorage
    cy.window().then((win) => {
      const gastos = JSON.parse(win.localStorage.getItem('gastos'));
      expect(gastos).to.deep.include({ cantidad: 50, descripcion: 'Taxi', categoria: 'Transporte' });
    });
  
    // Verificar que ambos gastos aparezcan en el historial
    cy.get('#cuerpo-historial-gastos').should('contain', 'Educación');
    cy.get('#cuerpo-historial-gastos').should('contain', 'Matricula');
    cy.get('#cuerpo-historial-gastos').should('contain', '$150');
  
    cy.get('#cuerpo-historial-gastos').should('contain', 'Transporte');
    cy.get('#cuerpo-historial-gastos').should('contain', 'Taxi');
    cy.get('#cuerpo-historial-gastos').should('contain', '$50');
  });
  
  
});
