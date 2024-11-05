import { Usuario } from './src/clases/Usuario.js';
import { Transaccion } from './src/clases/Transaccion.js';
import { ObjetivoAhorro } from './src/clases/ObjetivoAhorro.js';

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
  cuerpoHistorialGastos.innerHTML = '';

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
  cuerpoHistorialIngresos.innerHTML = '';

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

// Manejador para registrar un nuevo gasto
document.getElementById('form-gasto').addEventListener('submit', (event) => {
  event.preventDefault();

  const cantidad = parseFloat(document.getElementById('cantidad-gasto').value);
  const descripcion = document.getElementById('descripcion-gasto').value;
  const fecha = new Date().toLocaleDateString();

  transaccion.registrarGasto(cantidad, descripcion, fecha);
  mostrarHistorialGastos();
  actualizarSaldoTotal();
});

// Manejador para registrar un nuevo ingreso
document.getElementById('form-ingreso').addEventListener('submit', (event) => {
  event.preventDefault();

  const cantidad = parseFloat(document.getElementById('cantidad-ingreso').value);
  const descripcion = document.getElementById('descripcion-ingreso').value;
  const fecha = new Date().toLocaleDateString();

  transaccion.registrarIngreso(cantidad, descripcion, fecha);
  mostrarHistorialIngresos();
  actualizarSaldoTotal();
});

// Manejador para crear un nuevo objetivo de ahorro
document.getElementById('form-objetivo-ahorro').addEventListener('submit', (event) => {
  event.preventDefault();

  const descripcionObjetivo = document.getElementById('descripcion-objetivo').value;
  const cantidadObjetivo = parseFloat(document.getElementById('cantidad-objetivo').value);

  objetivoAhorro.crearObjetivo(descripcionObjetivo, cantidadObjetivo);
  
  const objetivoCreado = document.getElementById('objetivo-creado');
  objetivoCreado.textContent = `Objetivo: ${descripcionObjetivo} - Meta: $${cantidadObjetivo}`;
  objetivoCreado.style.display = 'block';
});
