import { Usuario } from '../clases/Usuario';

describe('Usuario', () => {
  test('debería permitir el login con usuario y contraseña correctos', () => {
    const usuario = new Usuario('estudiante', '12345'); 
    expect(usuario.login('estudiante', '12345')).toBe(true); 
  });

  test('debería fallar el login con usuario o contraseña incorrectos', () => {
    const usuario = new Usuario('estudiante', '12345'); 
    expect(usuario.login('estudiante', 'incorrecta')).toBe(false); 
    expect(usuario.login('incorrecto', '12345')).toBe(false); 
  });
});
