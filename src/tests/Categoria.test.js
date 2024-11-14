import { Categoria } from '../clases/Categoria';
import { Transaccion } from '../clases/Transaccion';

describe('Gestionar Categorías', () => {
    test('Debería permitir crear una categoría nueva', () => {
        const gestionCategorias = new Categoria();
        gestionCategorias.crearCategoria('Transporte');

        expect(gestionCategorias.obtenerCategorias()).toContain('Transporte');
    });

    test('Debería prevenir categorías duplicadas', () => {
        const gestionCategorias = new Categoria();
        gestionCategorias.crearCategoria('Alimentación');

        expect(() => gestionCategorias.crearCategoria('Alimentación')).toThrow('La categoría ya existe');
    });

    test('Debería prevenir categorías sin nombre', () => {
        const gestionCategorias = new Categoria();

        expect(() => gestionCategorias.crearCategoria('')).toThrow('El nombre de la categoría no puede estar vacío');
    });
});

describe('Gestión de Gastos con Categorías', () => {
    let transaccion;
  
    beforeEach(() => {
      transaccion = Transaccion();
    });
  
    test('Debería asignar una categoría a un gasto', () => {
      const gasto = transaccion.registrarGasto(100, 'Compra de libros', '01/01/2024', 'Educación');
      expect(gasto.categoria).toBe('Educación');
    });
  
    test('Debería asignar "Sin Categoría" si no se proporciona una categoría', () => {
      const gasto = transaccion.registrarGasto(50, 'Café', '01/01/2024');
      expect(gasto.categoria).toBe('Sin Categoría');
    });
  
    test('Debería incluir la categoría en el historial de gastos', () => {
      transaccion.registrarGasto(100, 'Compra de libros', '01/01/2024', 'Educación');
      const historial = transaccion.obtenerHistorialGastos();
      expect(historial[0]).toEqual(expect.objectContaining({ categoria: 'Educación' }));
    });
  });
