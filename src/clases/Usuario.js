export const Usuario = () => {
  const nombreUsuario = 'estudiante';
  const contrasenia = '12345';

  const login = (inputUsuario, inputContrasenia) => {
    return nombreUsuario === inputUsuario && contrasenia === inputContrasenia;
  };

  return { login };
};
