export const Transaccion = () => {
  const historialGastos = [];
  const historialIngresos = [];

  const registrarGasto = (cantidad, descripcion, fecha) => {
    historialGastos.push({ cantidad, descripcion, fecha });
  };

  const obtenerHistorialGastos = () => historialGastos;

  const registrarIngreso = (cantidad, descripcion, fecha) => {
    historialIngresos.push({ cantidad, descripcion, fecha });
  };

  const obtenerHistorialIngresos = () => historialIngresos;

  return {
    registrarGasto,
    obtenerHistorialGastos,
    registrarIngreso,
    obtenerHistorialIngresos
  };
};
