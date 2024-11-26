export const Transaccion = () => {
  const historialGastos = [];
  const historialIngresos = [];

  const registrarGasto = (cantidad, descripcion, fecha, categoria) => 
    historialGastos.push({ cantidad: parseFloat(cantidad), descripcion, categoria, fecha });

  const editarGasto = (indice, nuevaCantidad, nuevaDescripcion, nuevaCategoria, nuevaFecha) => {
    if (indice >= 0 && indice < historialGastos.length) {
      historialGastos[indice] = {
        cantidad: parseFloat(nuevaCantidad),
        descripcion: nuevaDescripcion,
        categoria: nuevaCategoria,
        fecha: nuevaFecha,
      };
    }
  };

  const eliminarGasto = (indice) => {
    if (indice >= 0 && indice < historialGastos.length) historialGastos.splice(indice, 1);
  };

  const obtenerHistorialGastos = () => historialGastos;

  const registrarIngreso = (cantidad, descripcion, fecha) => 
    historialIngresos.push({ cantidad: parseFloat(cantidad), descripcion, fecha });

  const editarIngreso = (indice, nuevaCantidad, nuevaDescripcion, nuevaFecha) => {
    if (indice >= 0 && indice < historialIngresos.length) {
      historialIngresos[indice] = {
        cantidad: parseFloat(nuevaCantidad),
        descripcion: nuevaDescripcion,
        fecha: nuevaFecha,
      };
    }
  };

  const eliminarIngreso = (indice) => {
    if (indice >= 0 && indice < historialIngresos.length) historialIngresos.splice(indice, 1);
  };

  const obtenerHistorialIngresos = () => historialIngresos;

  const calcularSaldoTotal = () => {
    const totalIngresos = historialIngresos.reduce((total, ingreso) => {
      return total + (isNaN(parseFloat(ingreso.cantidad)) ? 0 : parseFloat(ingreso.cantidad));
    }, 0);

    const totalGastos = historialGastos.reduce((total, gasto) => {
      return total + (isNaN(parseFloat(gasto.cantidad)) ? 0 : parseFloat(gasto.cantidad));
    }, 0);
    
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
