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

  test('no debería editar un gasto si los valores son los mismos', () => {
    const transaccion = Transaccion();
  
    // Registrar un gasto inicial
    transaccion.registrarGasto(100, 'Compra de libros', '2024-10-31');
  
    // Editar el gasto con los mismos valores
    transaccion.editarGasto(0, 100, 'Compra de libros', '2024-10-31');
  
    const historial = transaccion.obtenerHistorialGastos();
    
    // Verificar que el gasto no ha cambiado
    expect(historial).toHaveLength(1);
    expect(historial[0]).toEqual({
      cantidad: 100,
      descripcion: 'Compra de libros',
      fecha: '2024-10-31'
    });
  });
  
  test('debería eliminar un gasto correctamente', () => {
    const transaccion = Transaccion();
  
    // Registrar algunos gastos
    transaccion.registrarGasto(100, 'Compra de libros', '2024-10-31');
    transaccion.registrarGasto(200, 'Compra de ropa', '2024-11-01');
  
    // Eliminar el primer gasto
    transaccion.eliminarGasto(0);
  
    const historial = transaccion.obtenerHistorialGastos();
    
    // Verificar que el primer gasto ha sido eliminado
    expect(historial).toHaveLength(1);
    expect(historial[0]).toEqual({
      cantidad: 200,
      descripcion: 'Compra de ropa',
      fecha: '2024-11-01'
    });
  });
  
  test('no debería eliminar un gasto si el índice es inválido', () => {
    const transaccion = Transaccion();
  
    // Registrar algunos gastos
    transaccion.registrarGasto(100, 'Compra de libros', '2024-10-31');
    transaccion.registrarGasto(200, 'Compra de ropa', '2024-11-01');
  
    // Intentar eliminar un gasto en un índice fuera de rango
    transaccion.eliminarGasto(2); // Índice 2 no existe
  
    const historial = transaccion.obtenerHistorialGastos();
    
    // Verificar que el historial de gastos sigue igual
    expect(historial).toHaveLength(2);
    expect(historial[0]).toEqual({
      cantidad: 100,
      descripcion: 'Compra de libros',
      fecha: '2024-10-31'
    });
    expect(historial[1]).toEqual({
      cantidad: 200,
      descripcion: 'Compra de ropa',
      fecha: '2024-11-01'
    });
  });
  

});