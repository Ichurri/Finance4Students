export const Transaccion = () => {
  const historialGastos = [];
  const historialIngresos = [];

  const registrarGasto = (cantidad, descripcion, fecha, categoria = 'Sin Categoría') => {
    const gasto = { cantidad, descripcion, fecha, categoria };
    historialGastos.push(gasto);
    return gasto; // Retornar el gasto para confirmación
  };

  const obtenerHistorialGastos = () => historialGastos;

  const registrarIngreso = (cantidad, descripcion, fecha) => {
    historialIngresos.push({ cantidad, descripcion, fecha });
  };

  const obtenerHistorialIngresos = () => historialIngresos;

  const calcularSaldoTotal = () => {
    const totalIngresos = historialIngresos.reduce((total, ingreso) => total + ingreso.cantidad, 0);
    const totalGastos = historialGastos.reduce((total, gasto) => total + gasto.cantidad, 0);
    return totalIngresos - totalGastos;
  };

  return {
    registrarGasto,
    obtenerHistorialGastos,
    registrarIngreso,
    obtenerHistorialIngresos,
    calcularSaldoTotal,
  };
};
