export const ObjetivoAhorro = () => {
  let objetivos = [];

  const crearObjetivo = (descripcion, cantidadObjetivo) => {
    const nuevoObjetivo = { descripcion, cantidadObjetivo };
    objetivos.push(nuevoObjetivo);
  };

  const obtenerObjetivos = () => objetivos;

  const cargarObjetivos = (objetivosGuardados) => objetivos = objetivosGuardados;

  return {
    crearObjetivo,
    obtenerObjetivos,
    cargarObjetivos,
  };
};
