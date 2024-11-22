export const Transaccion = () => {
  const historialGastos = [];
  const historialIngresos = [];

  // Registrar un gasto
  const registrarGasto = (cantidad, descripcion, fecha) => {
    historialGastos.push({ cantidad: parseFloat(cantidad) || 0, descripcion, fecha });
  };

  // Editar un gasto
  const editarGasto = (indice, nuevaCantidad, nuevaDescripcion, nuevaFecha) => {
    if (indice >= 0 && indice < historialGastos.length) {
      historialGastos[indice] = {
        cantidad: parseFloat(nuevaCantidad) || 0,
        descripcion: nuevaDescripcion,
        fecha: nuevaFecha,
      };
    }
  };

  // Eliminar un gasto
  const eliminarGasto = (indice) => {
    if (indice >= 0 && indice < historialGastos.length) {
      historialGastos.splice(indice, 1);
    }
  };

  // Obtener historial de gastos
  const obtenerHistorialGastos = () => historialGastos;

  // Registrar un ingreso
  const registrarIngreso = (cantidad, descripcion, fecha) => {
    historialIngresos.push({ cantidad: parseFloat(cantidad) || 0, descripcion, fecha });
  };

  // Editar un ingreso
  const editarIngreso = (indice, nuevaCantidad, nuevaDescripcion, nuevaFecha) => {
    if (indice >= 0 && indice < historialIngresos.length) {
      historialIngresos[indice] = {
        cantidad: parseFloat(nuevaCantidad) || 0,
        descripcion: nuevaDescripcion,
        fecha: nuevaFecha,
      };
    }
  };

  // Eliminar un ingreso
  const eliminarIngreso = (indice) => {
    if (indice >= 0 && indice < historialIngresos.length) {
      historialIngresos.splice(indice, 1);
    }
  };

  // Obtener historial de ingresos
  const obtenerHistorialIngresos = () => historialIngresos;

  // Calcular el saldo total
  const calcularSaldoTotal = () => {
    console.log("Historial de Ingresos:", historialIngresos);
    console.log("Historial de Gastos:", historialGastos);

    const totalIngresos = historialIngresos.reduce((total, ingreso) => {
      return total + (isNaN(parseFloat(ingreso.cantidad)) ? 0 : parseFloat(ingreso.cantidad));
    }, 0);

    const totalGastos = historialGastos.reduce((total, gasto) => {
      return total + (isNaN(parseFloat(gasto.cantidad)) ? 0 : parseFloat(gasto.cantidad));
    }, 0);

    console.log("Total Ingresos:", totalIngresos);
    console.log("Total Gastos:", totalGastos);
    console.log("Saldo Total:", totalIngresos - totalGastos);

    return totalIngresos - totalGastos;
  };

  return {
    registrarGasto,
    editarGasto,
    eliminarGasto,
    obtenerHistorialGastos,
    registrarIngreso,
    editarIngreso,
    eliminarIngreso,
    obtenerHistorialIngresos,
    calcularSaldoTotal,
  };
};
