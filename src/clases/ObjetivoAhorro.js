export const ObjetivoAhorro = () => {
  let descripcion = '';
  let cantidadObjetivo = 0;
  let presupuesto = 0;

  const crearObjetivo = (nuevaDescripcion, nuevaCantidadObjetivo) => {
    if (!nuevaDescripcion || nuevaCantidadObjetivo <= 0) {
      throw new Error('Descripción y cantidad objetivo deben ser válidas');
    }
    descripcion = nuevaDescripcion;
    cantidadObjetivo = nuevaCantidadObjetivo;
  };

  const obtenerDetallesObjetivo = () => ({
    descripcion,
    cantidadObjetivo,
  });

  const definirPresupuesto = (nuevoPresupuesto) => {
    if (nuevoPresupuesto < 0) {
      throw new Error('El presupuesto no puede ser negativo');
    }
    presupuesto = nuevoPresupuesto;
  };

  const obtenerPresupuesto = () => presupuesto;

  // Nuevas funciones para editar el objetivo
  const editarDescripcion = (nuevaDescripcion) => {
    if (!nuevaDescripcion.trim()) { // Asegurarse de que no esté vacío o solo espacios
      throw new Error('La descripción no puede estar vacía');
    }
    descripcion = nuevaDescripcion;
  };
  

  const editarCantidad = (nuevaCantidad) => {
    if (nuevaCantidad <= 0 || isNaN(nuevaCantidad)) { // Validación más estricta
      throw new Error('La cantidad debe ser un número positivo');
    }
    cantidadObjetivo = nuevaCantidad;
  };
  

  return {
    crearObjetivo,
    obtenerDetallesObjetivo,
    definirPresupuesto,
    obtenerPresupuesto,
    editarDescripcion, // Agregado
    editarCantidad, // Agregado
  };
};
