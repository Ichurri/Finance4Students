export const Transaccion = () => {
    const historialGastos = [];
  
    const registrarGasto = (cantidad, descripcion, fecha) => {
      historialGastos.push({ cantidad, descripcion, fecha });
    };
  
    const obtenerHistorialGastos = () => historialGastos;
  
    return { registrarGasto, obtenerHistorialGastos };
  };
  