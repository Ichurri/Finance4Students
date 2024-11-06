export const ObjetivoAhorro = () => {
  let descripcion = '';
  let cantidadObjetivo = 0;
  let presupuesto = 0;

  const crearObjetivo = (nuevaDescripcion, nuevaCantidadObjetivo) => {
    descripcion = nuevaDescripcion;
    cantidadObjetivo = nuevaCantidadObjetivo;
  };

  const obtenerDetallesObjetivo = () => ({
    descripcion,
    cantidadObjetivo
  });

  const definirPresupuesto = (nuevoPresupuesto) => {
    presupuesto = nuevoPresupuesto;
  };

  const obtenerPresupuesto = () => presupuesto;

  return {
    crearObjetivo,
    obtenerDetallesObjetivo,
    definirPresupuesto,
    obtenerPresupuesto
  };
};
