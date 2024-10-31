import { Transaccion } from '../clases/Transaccion';

describe('Transaccion', () => {
  test('debería registrar un gasto con cantidad, descripción y fecha', () => {
    const transaccion = Transaccion();
    transaccion.registrarGasto(100, 'Compra de libros', '2024-10-31');

    const historial = transaccion.obtenerHistorialGastos();
    expect(historial).toHaveLength(1);
    expect(historial[0]).toEqual({
      cantidad: 100,
      descripcion: 'Compra de libros',
      fecha: '2024-10-31'
    });
  });
});
