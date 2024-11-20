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

  test('debería registrar un ingreso con cantidad, descripción y fecha', () => {
    const transaccion = Transaccion();
    transaccion.registrarIngreso(500, 'Mesada', '2024-10-31');

    const historialIngresos = transaccion.obtenerHistorialIngresos();
    expect(historialIngresos).toHaveLength(1);
    expect(historialIngresos[0]).toEqual({
      cantidad: 500,
      descripcion: 'Mesada',
      fecha: '2024-10-31'
    });
  });

  test('debería calcular el saldo total disponible', () => {
    const transaccion = Transaccion();

    // Registrar ingresos y gastos
    transaccion.registrarIngreso(500, 'Mesada', '2024-10-31');
    transaccion.registrarGasto(200, 'Compra de útiles', '2024-10-31');
    transaccion.registrarIngreso(300, 'Trabajo de medio tiempo', '2024-11-01');
    transaccion.registrarGasto(100, 'Comida', '2024-11-01');

    // Verificar el saldo total
    const saldoTotal = transaccion.calcularSaldoTotal();
    expect(saldoTotal).toBe(500); // 500 + 300 - 200 - 100 = 500
  });

  test('debería devolver 0 cuando no hay ingresos ni gastos', () => {
    const transaccion = Transaccion();

    const saldoTotal = transaccion.calcularSaldoTotal();
    expect(saldoTotal).toBe(0);
  });

  // Editar un gasto
  test('deberia editar un gasto', () => {
    const transaccion = Transaccion();
    transaccion.registrarGasto(100, 'CompraLibros', '2024-10-31');

    transaccion.editarGasto(0, 150, 'Lapiceros y cuadernos', '2024-11-14')
    const historial = transaccion.obtenerHistorialGastos();
    expect(historial).toHaveLength(1);
    expect(historial[0]).toEqual({
      cantidad: 150,
      descripcion: 'Lapiceros y cuadernos',
      fecha: '2024-11-14'
    });
  });

  test('no debería editar un gasto si el índice es inválido', () => {
    const transaccion = Transaccion();
    transaccion.registrarGasto(100, 'Compra de libros', '2024-10-31');
    
    // Intentar editar un gasto con un índice fuera de rango
    transaccion.editarGasto(1, 200, 'Lapiceros y cuadernos', '2024-11-14');
    
    const historial = transaccion.obtenerHistorialGastos();
    expect(historial).toHaveLength(1); // El gasto no debe haber cambiado
    expect(historial[0]).toEqual({
      cantidad: 100,
      descripcion: 'Compra de libros',
      fecha: '2024-10-31'
    });
  });

});