import { ObjetivoAhorro } from '../clases/ObjetivoAhorro';

describe('ObjetivoAhorro', () => {
  test('debería crear un objetivo de ahorro con descripción y cantidad', () => {
    const objetivo = ObjetivoAhorro();
    objetivo.crearObjetivo('Ahorro para viaje', 1000);

    const detallesObjetivo = objetivo.obtenerDetallesObjetivo();
    expect(detallesObjetivo).toEqual({
      descripcion: 'Ahorro para viaje',
      cantidadObjetivo: 1000
    });
  });

  test('debería definir un presupuesto para el objetivo', () => {
    const objetivo = ObjetivoAhorro();
    objetivo.crearObjetivo('Ahorro para viaje', 1000);
    objetivo.definirPresupuesto(200);

    const presupuesto = objetivo.obtenerPresupuesto();
    expect(presupuesto).toBe(200);
  });

  test('debería permitir editar la descripción del objetivo', () => {
    objetivoAhorro.crearObjetivo('Viaje a Europa', 1000);
    objetivoAhorro.editarDescripcion('Viaje a Asia');
    const detalles = objetivoAhorro.obtenerDetallesObjetivo();
    expect(detalles.descripcion).toBe('Viaje a Asia');
  });

  test('debería permitir editar la cantidad del objetivo', () => {
    objetivoAhorro.crearObjetivo('Viaje a Europa', 1000);
    objetivoAhorro.editarCantidad(2000);
    const detalles = objetivoAhorro.obtenerDetallesObjetivo();
    expect(detalles.cantidadObjetivo).toBe(2000);
  });

  test('debería lanzar un error si la cantidad es negativa', () => {
    objetivoAhorro.crearObjetivo('Viaje a Europa', 1000);
    expect(() => objetivoAhorro.editarCantidad(-500)).toThrow('La cantidad debe ser un número positivo');
  });

  test('debería lanzar un error si la descripción está vacía', () => {
    objetivoAhorro.crearObjetivo('Viaje a Europa', 1000);
    expect(() => objetivoAhorro.editarDescripcion('')).toThrow('La descripción no puede estar vacía');
  });
});
