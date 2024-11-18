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
});

describe('Gestión de Gastos con Categorías', () => {
  beforeEach(() => {
    cy.visit('index.html');
    cy.get('#username').type('estudiante');
    cy.get('#password').type('12345');
    cy.get('#login-form').submit();
  });

  it('Debería permitir registrar un gasto con categoría seleccionada', () => {
    cy.get('#nombre-categoria').type('Educación');
    cy.get('#form-categoria').submit();

    cy.get('#cantidad-gasto').type('100');
    cy.get('#descripcion-gasto').type('Compra de libros');
    cy.get('#categoria-gasto').select('Educación');
    cy.get('#form-gasto').submit();

    cy.get('#cuerpo-historial-gastos').should('contain', 'Educación');
    cy.get('#cuerpo-historial-gastos').should('contain', 'Compra de libros');
    cy.get('#cuerpo-historial-gastos').should('contain', '$100');
  });

  it('Debería asignar "Sin Categoría" si no se selecciona ninguna categoría', () => {
    cy.get('#cantidad-gasto').type('50');
    cy.get('#descripcion-gasto').type('Café');
    cy.get('#form-gasto').submit();

    cy.get('#cuerpo-historial-gastos').should('contain', 'Sin Categoría');
    cy.get('#cuerpo-historial-gastos').should('contain', 'Café');
    cy.get('#cuerpo-historial-gastos').should('contain', '$50');
  });

  it('Debería registrar múltiples gastos con diferentes categorías', () => {
    cy.get('#nombre-categoria').type('Educación');
    cy.get('#form-categoria').submit();
  
    cy.get('#nombre-categoria').type('Transporte');
    cy.get('#form-categoria').submit();
  
    cy.get('#cantidad-gasto').type('150');
    cy.get('#descripcion-gasto').type('Matricula');
    cy.get('#categoria-gasto').select('Educación');
    cy.get('#form-gasto').submit();
  
    cy.window().then((win) => {
      const gastos = JSON.parse(win.localStorage.getItem('gastos'));
      expect(gastos).to.deep.include({ cantidad: 150, descripcion: 'Matricula', categoria: 'Educación' });
    });
  });
  
});

describe('Gestión de Objetivo de Ahorro', () => {
  beforeEach(() => {
    cy.visit('index.html');
    cy.get('#username').type('estudiante');
    cy.get('#password').type('12345');
    cy.get('#login-form').submit();
  });

  it('Debería permitir crear un nuevo objetivo de ahorro', () => {
    cy.get('#descripcion-objetivo').type('Viaje a Europa');
    cy.get('#cantidad-objetivo').type('1000');
    cy.get('#form-objetivo-ahorro').submit();

    cy.get('#objetivo-creado').should('contain', 'Viaje a Europa');
    cy.get('#objetivo-creado').should('contain', '1000');
  });

  it('Debería permitir editar la descripción del objetivo de ahorro', () => {
    cy.get('#descripcion-objetivo').type('Viaje a Europa');
    cy.get('#cantidad-objetivo').type('1000');
    cy.get('#form-objetivo-ahorro').submit();

    cy.get('#editar-descripcion-objetivo').type('Viaje a Asia');
    cy.get('#form-editar-objetivo').submit();

    cy.get('#objetivo-creado').should('contain', 'Viaje a Asia');
    cy.get('#objetivo-creado').should('contain', '1000');
  });

  it('Debería permitir editar la cantidad del objetivo de ahorro', () => {
    cy.get('#descripcion-objetivo').type('Viaje a Europa');
    cy.get('#cantidad-objetivo').type('1000');
    cy.get('#form-objetivo-ahorro').submit();

    cy.get('#editar-cantidad-objetivo').type('2000');
    cy.get('#form-editar-objetivo').submit();

    cy.get('#objetivo-creado').should('contain', 'Viaje a Europa');
    cy.get('#objetivo-creado').should('contain', '2000');
  });

  it('Debería mostrar un error al intentar editar la cantidad con un valor inválido', () => {
    cy.get('#descripcion-objetivo').type('Viaje a Europa');
    cy.get('#cantidad-objetivo').type('1000');
    cy.get('#form-objetivo-ahorro').submit();
  
    cy.get('#editar-cantidad-objetivo').type('-500');
    cy.get('#form-editar-objetivo').submit();
  
    cy.on('window:alert', (str) => {
      expect(str).to.equal('La cantidad debe ser un número positivo');
    });
  });
  
  it('Debería mostrar un error al intentar editar la descripción con un valor vacío', () => {
    cy.get('#descripcion-objetivo').type('Viaje a Europa');
    cy.get('#cantidad-objetivo').type('1000');
    cy.get('#form-objetivo-ahorro').submit();
  
    cy.get('#editar-descripcion-objetivo').clear();
    cy.get('#form-editar-objetivo').submit();
  
    cy.on('window:alert', (str) => {
      expect(str).to.equal('La descripción no puede estar vacía');
    });
  });
  
});
