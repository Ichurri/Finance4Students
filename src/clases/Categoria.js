export class Categoria {
    constructor() {
        this.categorias = [];
    }

    crearCategoria(nombre) {
        if (!nombre) {
            throw new Error("El nombre de la categoría no puede estar vacío");
        }

        if (this.categorias.includes(nombre)) {
            throw new Error("La categoría ya existe");
        }

        this.categorias.push(nombre);
    }

    obtenerCategorias() {
        return this.categorias;
    }
}
