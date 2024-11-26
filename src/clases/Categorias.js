export const Categorias = () => {
    let categorias = [];
  
    const crearCategoria = (nuevaCategoria) => {
      if (nuevaCategoria && !categorias.includes(nuevaCategoria)) categorias.push(nuevaCategoria);
    };
  
    const obtenerCategorias = () => {
      return [...categorias];
    };
  
    return {
      crearCategoria,
      obtenerCategorias,
    };
  };
  