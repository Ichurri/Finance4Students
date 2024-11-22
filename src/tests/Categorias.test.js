import { Categorias } from '../clases/Categorias';

describe('Categorias', () => {
  test('debería crear una categoria', () => {
    const categoria = Categorias();
    categoria.crearCategoria('Comida');

    const categoriasGuardadas = categoria.obtenerCategorias();
    expect(categoriasGuardadas).toEqual(['Comida']);
  });

  test('no debería agregar categorías duplicadas', () => {
    const categoria = Categorias();
    categoria.crearCategoria('Comida');
    categoria.crearCategoria('Comida');

    const categoriasGuardadas = categoria.obtenerCategorias();
    expect(categoriasGuardadas).toEqual(['Comida']);
  });

  test('no debería agregar categorías duplicadas', () => {
    const categoria = Categorias();
    categoria.crearCategoria('Comida');
    categoria.crearCategoria('Comida'); 

    const categoriasGuardadas = categoria.obtenerCategorias();
    expect(categoriasGuardadas).toEqual(['Comida']);
  });

  test('deberias agregar varias categorias', () => {
    const categoria = Categorias();
    categoria.crearCategoria('Comida');
    categoria.crearCategoria('Bebida');
    categoria.crearCategoria('Salida');

    const categoriasGuardadas = categoria.obtenerCategorias();
    expect(categoriasGuardadas).toEqual(['Comida', 'Bebida', 'Salida']);
  });
});