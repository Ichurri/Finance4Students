import { Categorias } from '../clases/Categorias';

describe('Categorias', () => {
  test('debería crear una categoria', () => {
    const categoria = Categorias();
    categoria.crearCategoria('Comida');

    const categoriasGuardadas = categoria.obtenerCategorias();
    expect(categoriasGuardadas).toEqual(['Comida']);
  });
});