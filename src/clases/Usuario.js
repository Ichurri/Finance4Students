export const Usuario = () => {
  const NOMBRE_USUARIO = 'estudiante';
  const CONTRASENIA = '12345';


  const login = (inputUsuario, inputContrasenia) => {
    const validUser = inputUsuario === NOMBRE_USUARIO;
    const validPassword = inputContrasenia === CONTRASENIA;
    return validUser && validPassword;
  };

  return { login };
};
