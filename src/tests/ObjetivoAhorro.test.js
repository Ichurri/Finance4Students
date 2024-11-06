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
});