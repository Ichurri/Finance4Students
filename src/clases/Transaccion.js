export const Transaccion = () => {
  const historialGastos = [];
  const historialIngresos = [];

  const registrarGasto = (cantidad, descripcion, fecha, categoria = 'Sin Categoría') => {
    const gasto = { cantidad, descripcion, fecha, categoria }; // Crear el objeto del gasto
    historialGastos.push(gasto); // Agregar el gasto al historial
    return gasto; // Retornar el objeto para que sea verificable
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
