import { Usuario } from './src/clases/Usuario';

const usuario = Usuario();

document.getElementById('login-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (usuario.login(username, password)) {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('app-container').style.display = 'block';
  } else {
    alert('Credenciales incorrectas'); // Mostrar alerta en caso de error
  }
});
