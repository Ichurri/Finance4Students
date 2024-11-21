export const Transaccion = () => {
  const historialGastos = [];
  const historialIngresos = [];

  const registrarGasto = (cantidad, descripcion, fecha) => {
    historialGastos.push({ cantidad, descripcion, fecha });
  };

  const editarGasto = (indice, nuevaCantidad, nuevaDescripcion, nuevaFecha) => {
    if (indice >= 0 && indice < historialGastos.length) {
      historialGastos[indice] = {
        cantidad: nuevaCantidad,
        descripcion: nuevaDescripcion,
        fecha: nuevaFecha
      };
    }
  };
  
  // Método para eliminar un gasto por índice
  const eliminarGasto = (indice) => {
  if (indice >= 0 && indice < historialGastos.length) {
    historialGastos.splice(indice, 1);
    };
  };


  const obtenerHistorialGastos = () => historialGastos;

  const registrarIngreso = (cantidad, descripcion, fecha) => {
    historialIngresos.push({ cantidad, descripcion, fecha });
  };

  const editarIngreso = (indice, nuevaCantidad, nuevaDescripcion, nuevaFecha) => {
    if (indice >= 0 && indice < historialIngresos.length) {
      historialIngresos[indice] = {
        cantidad: nuevaCantidad,
        descripcion: nuevaDescripcion,
        fecha: nuevaFecha,
      };
    }
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
    editarGasto,
    eliminarGasto,
    editarIngreso
  };
};