import { Usuario } from './src/clases/Usuario.js';
import { Transaccion } from './src/clases/Transaccion.js';
import { ObjetivoAhorro } from './src/clases/ObjetivoAhorro.js';
import { Categoria } from './src/clases/Categoria.js';

const usuario = Usuario();
const transaccion = Transaccion();
const objetivoAhorro = ObjetivoAhorro();
const gestionCategorias = new Categoria();

// Funciones auxiliares para `localStorage`
const guardarEnLocalStorage = (clave, valor) => {
  localStorage.setItem(clave, JSON.stringify(valor));
};

const obtenerDeLocalStorage = (clave) => {
  const datos = localStorage.getItem(clave);
  return datos ? JSON.parse(datos) : null;
};

// Manejo de login
document.getElementById('login-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (usuario.login(username, password)) {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('app-container').style.display = 'block';
    cargarDatos(); // Cargar los datos desde localStorage al iniciar sesión
  } else {
    alert('Credenciales incorrectas');
  }
});

// Actualizar saldo total y guardar en localStorage
const actualizarSaldoTotal = () => {
  const saldoTotal = transaccion.calcularSaldoTotal();
  document.getElementById('saldo-total').textContent = `$${saldoTotal}`;
  guardarEnLocalStorage('saldoTotal', saldoTotal);
};

// Mostrar historial de gastos en la interfaz
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

// Mostrar historial de ingresos en la interfaz
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

// Guardar un gasto en localStorage
document.getElementById('form-gasto').addEventListener('submit', (event) => {
  event.preventDefault();

  const cantidad = parseFloat(document.getElementById('cantidad-gasto').value);
  const descripcion = document.getElementById('descripcion-gasto').value;
  const fecha = new Date().toLocaleDateString();

  transaccion.registrarGasto(cantidad, descripcion, fecha);
  guardarEnLocalStorage('gastos', transaccion.obtenerHistorialGastos());
  mostrarHistorialGastos();
  actualizarSaldoTotal();
});

// Guardar un ingreso en localStorage
document.getElementById('form-ingreso').addEventListener('submit', (event) => {
  event.preventDefault();

  const cantidad = parseFloat(document.getElementById('cantidad-ingreso').value);
  const descripcion = document.getElementById('descripcion-ingreso').value;
  const fecha = new Date().toLocaleDateString();

  transaccion.registrarIngreso(cantidad, descripcion, fecha);
  guardarEnLocalStorage('ingresos', transaccion.obtenerHistorialIngresos());
  mostrarHistorialIngresos();
  actualizarSaldoTotal();
});

// Guardar el objetivo en localStorage
document.getElementById('form-objetivo-ahorro').addEventListener('submit', (event) => {
  event.preventDefault();

  const descripcionObjetivo = document.getElementById('descripcion-objetivo').value;
  const cantidadObjetivo = parseFloat(document.getElementById('cantidad-objetivo').value);

  objetivoAhorro.crearObjetivo(descripcionObjetivo, cantidadObjetivo);
  guardarEnLocalStorage('objetivo', objetivoAhorro.obtenerDetallesObjetivo());
  
  const objetivoCreado = document.getElementById('objetivo-creado');
  objetivoCreado.textContent = `Objetivo: ${descripcionObjetivo} - Meta: $${cantidadObjetivo}`;
  objetivoCreado.style.display = 'block';
});

// Función para cargar datos desde `localStorage`
const cargarDatos = () => {
  const gastosGuardados = obtenerDeLocalStorage('gastos');
  if (gastosGuardados) {
    gastosGuardados.forEach(gasto => transaccion.registrarGasto(gasto.cantidad, gasto.descripcion, gasto.fecha));
    mostrarHistorialGastos();
  }

  const ingresosGuardados = obtenerDeLocalStorage('ingresos');
  if (ingresosGuardados) {
    ingresosGuardados.forEach(ingreso => transaccion.registrarIngreso(ingreso.cantidad, ingreso.descripcion, ingreso.fecha));
    mostrarHistorialIngresos();
  }

  const saldoGuardado = obtenerDeLocalStorage('saldoTotal');
  if (saldoGuardado !== null) {
    document.getElementById('saldo-total').textContent = `$${saldoGuardado}`;
  }

  const objetivoGuardado = obtenerDeLocalStorage('objetivo');
  if (objetivoGuardado) {
    const objetivoCreado = document.getElementById('objetivo-creado');
    objetivoCreado.textContent = `Objetivo: ${objetivoGuardado.descripcion} - Meta: $${objetivoGuardado.cantidadObjetivo}`;
    objetivoCreado.style.display = 'block';
  }

  const categoriasGuardadas = obtenerDeLocalStorage('categorias');
  if (categoriasGuardadas) {
    categoriasGuardadas.forEach(categoria => gestionCategorias.crearCategoria(categoria));
    actualizarListaCategorias();
  }
};

// Gestionar Categorías
document.getElementById('form-categoria').addEventListener('submit', (event) => {
  event.preventDefault();

  const nombreCategoria = document.getElementById('nombre-categoria').value;

  try {
    gestionCategorias.crearCategoria(nombreCategoria);
    guardarEnLocalStorage('categorias', gestionCategorias.obtenerCategorias());
    actualizarListaCategorias();
    alert('Categoría creada con éxito');
  } catch (error) {
    alert(error.message); // Mostrar el mensaje de error correspondiente
  }

  document.getElementById('nombre-categoria').value = ''; // Limpiar el campo
});

const actualizarListaCategorias = () => {
  const listaCategorias = document.getElementById('lista-categorias');
  listaCategorias.innerHTML = '';

  gestionCategorias.obtenerCategorias().forEach((categoria) => {
    const li = document.createElement('li');
    li.textContent = categoria;
    listaCategorias.appendChild(li);
  });
};
