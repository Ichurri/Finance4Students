export const Usuario = () => {
    const nombreUsuario = 'estudiante';
    const contraseña = '12345';
  
    const login = (inputUsuario, inputContraseña) => {
      return nombreUsuario === inputUsuario && contraseña === inputContraseña;
    };
  
    return { login };
  };
  