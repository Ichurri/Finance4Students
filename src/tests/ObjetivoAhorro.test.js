import { ObjetivoAhorro } from '../clases/ObjetivoAhorro';

describe('ObjetivoAhorro', () => {
  test('debería crear un objetivo de ahorro con descripción y cantidad', () => {
    const objetivo = ObjetivoAhorro();
    objetivo.crearObjetivo('Ahorro para viaje', 1000);

    const objetivos = objetivo.obtenerObjetivos();
    expect(objetivos).toEqual([
      {
        descripcion: 'Ahorro para viaje',
        cantidadObjetivo: 1000
      }
    ]);
  });

  test('debería cargar objetivos guardados', () => {
    const objetivo = ObjetivoAhorro();
    const objetivosGuardados = [
      { descripcion: 'Ahorro para coche', cantidadObjetivo: 5000 },
      { descripcion: 'Ahorro para vacaciones', cantidadObjetivo: 2000 }
    ];
    
    objetivo.cargarObjetivos(objetivosGuardados);

    const objetivos = objetivo.obtenerObjetivos();
    expect(objetivos).toEqual(objetivosGuardados);
  });

  test('debería crear y cargar objetivos correctamente', () => {
    const objetivo = ObjetivoAhorro();

    // Crear un nuevo objetivo
    objetivo.crearObjetivo('Ahorro para auto', 3000);

    const objetivos = objetivo.obtenerObjetivos();
    expect(objetivos).toEqual([
      { descripcion: 'Ahorro para auto', cantidadObjetivo: 3000 }
    ]);

    // Cargar objetivos previos
    const objetivosGuardados = [
      { descripcion: 'Ahorro para casa', cantidadObjetivo: 10000 }
    ];
    objetivo.cargarObjetivos(objetivosGuardados);

    const objetivosCargados = objetivo.obtenerObjetivos();
    expect(objetivosCargados).toEqual(objetivosGuardados);
  });
});
