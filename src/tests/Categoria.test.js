import { Categoria } from '../clases/Categoria';

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
