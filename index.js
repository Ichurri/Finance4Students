import { Usuario } from './src/clases/Usuario';
import { Transaccion } from './src/clases/Transaccion';
import { ObjetivoAhorro } from './src/clases/ObjetivoAhorro';

const usuario = Usuario();
const transaccion = Transaccion();
const objetivoAhorro = ObjetivoAhorro();

document.getElementById('login-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (usuario.login(username, password)) {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('app-container').style.display = 'block';
    actualizarSaldoTotal();
    mostrarHistorialGastos();
    mostrarHistorialIngresos();
  } else {
    alert('Credenciales incorrectas');
  }
});

const actualizarSaldoTotal = () => {
  const saldoTotal = transaccion.calcularSaldoTotal();
  document.getElementById('saldo-total').textContent = `$${saldoTotal}`;
};

const mostrarHistorialGastos = () => {
  const cuerpoHistorialGastos = document.getElementById('cuerpo-historial-gastos');
  cuerpoHistorialGastos.innerHTML = ''; // Limpiar contenido previo

  transaccion.obtenerHistorialGastos().forEach(gasto => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>$${gasto.cantidad}</td>
      <td>${gasto.descripcion}</td>
      <td>${gasto.fecha}</td>
    `;
    cuerpoHistorialGastos.appendChild(fila);
  });
};

const mostrarHistorialIngresos = () => {
  const cuerpoHistorialIngresos = document.getElementById('cuerpo-historial-ingresos');
  cuerpoHistorialIngresos.innerHTML = ''; // Limpiar contenido previo

  transaccion.obtenerHistorialIngresos().forEach(ingreso => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>$${ingreso.cantidad}</td>
      <td>${ingreso.descripcion}</td>
      <td>${ingreso.fecha}</td>
    `;
    cuerpoHistorialIngresos.appendChild(fila);
  });
};

// Manejar la creación de un nuevo objetivo de ahorro
document.getElementById('form-objetivo-ahorro').addEventListener('submit', (event) => {
  event.preventDefault();

  const descripcionObjetivo = document.getElementById('descripcion-objetivo').value;
  const cantidadObjetivo = parseFloat(document.getElementById('cantidad-objetivo').value);

  objetivoAhorro.crearObjetivo(descripcionObjetivo, cantidadObjetivo);
  
  const objetivoCreado = document.getElementById('objetivo-creado');
  objetivoCreado.textContent = `Objetivo: ${descripcionObjetivo} - Meta: $${cantidadObjetivo}`;
  objetivoCreado.style.display = 'block';
});
