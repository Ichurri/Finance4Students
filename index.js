import { Usuario } from "./src/clases/Usuario.js";
import { ObjetivoAhorro } from "./src/clases/ObjetivoAhorro.js";
import { Transaccion } from "./src/clases/Transaccion.js";
import { transformSync } from "@babel/core";

const usuario = Usuario();
const transaccion = Transaccion();
const objetivoAhorro = ObjetivoAhorro();

// Funciones auxiliares para `localStorage`
const guardarEnLocalStorage = (clave, valor) => {
  localStorage.setItem(clave, JSON.stringify(valor));
};

const obtenerDeLocalStorage = (clave) => {
  const datos = localStorage.getItem(clave);
  return datos ? JSON.parse(datos) : null;
};

// Manejo de login
document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (usuario.login(username, password)) {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("app-container").style.display = "block";
    cargarDatos(); // Cargar los datos desde localStorage al iniciar sesión
  } else {
    alert("Credenciales incorrectas");
  }
});

// Actualizar saldo total y guardar en localStorage
const actualizarSaldoTotal = () => {
  const saldoTotal = transaccion.calcularSaldoTotal();
  document.getElementById("saldo-total").textContent = `$${saldoTotal}`;
  guardarEnLocalStorage("saldoTotal", saldoTotal);
};

// Referencias a botones y elementos del DOM
const botonAgregar = document.getElementById("btn-agregar");
const botonActualizar = document.getElementById("btn-actualizar");
const formGasto = document.getElementById("form-gasto");

// Variable para almacenar el índice del gasto en edición
let indexEnEdicion = null;

// Función para mostrar el historial de gastos
function mostrarHistorialGastos() {
  const cuerpoHistorial = document.getElementById("cuerpo-historial-gastos");
  cuerpoHistorial.innerHTML = "";
  const gastos = transaccion.obtenerHistorialGastos();

  gastos.forEach((gasto, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${gasto.cantidad}</td>
      <td>${gasto.descripcion}</td>
      <td>${gasto.fecha}</td>
      <td>
        <button class="editar-btn" data-index="${index}">Editar</button>
        <button class="eliminar-btn" data-index="${index}">Eliminar</button>
      </td>
    `;
    cuerpoHistorial.appendChild(fila);
  });
}

// Delegación de eventos para editar o eliminar
document
  .getElementById("cuerpo-historial-gastos")
  .addEventListener("click", (event) => {
    const boton = event.target;

    // Editar gasto
    if (boton.classList.contains("editar-btn")) {
      const index = boton.dataset.index;
      const gasto = transaccion.obtenerHistorialGastos()[index];

      // Rellenar los campos del formulario
      document.getElementById("cantidad-gasto").value = gasto.cantidad;
      document.getElementById("descripcion-gasto").value = gasto.descripcion;

      // Configurar el índice en edición y mostrar botón de actualizar
      indexEnEdicion = index;
      botonAgregar.style.display = "none";
      botonActualizar.style.display = "block";
    }

    // Eliminar gasto
    if (boton.classList.contains("eliminar-btn")) {
      const index = boton.dataset.index;
      transaccion.eliminarGasto(index);
      mostrarHistorialGastos();
      actualizarSaldoTotal();
    }
  });

// Agregar un nuevo gasto
botonAgregar.addEventListener("click", (e) => {
  e.preventDefault();
  const cantidad = parseFloat(document.getElementById("cantidad-gasto").value);
  const descripcion = document.getElementById("descripcion-gasto").value;
  const fecha = new Date().toLocaleDateString();

  if (isNaN(cantidad) || descripcion.trim() === "") {
    alert("Por favor, completa los campos correctamente.");
    return;
  }

  transaccion.registrarGasto(cantidad, descripcion, fecha);
  formGasto.reset();
  mostrarHistorialGastos();
  actualizarSaldoTotal();
});

// Actualizar un gasto existente
botonActualizar.addEventListener("click", () => {
  const cantidad = parseFloat(document.getElementById("cantidad-gasto").value);
  const descripcion = document.getElementById("descripcion-gasto").value;
  const fecha = new Date().toLocaleDateString();

  if (isNaN(cantidad) || descripcion.trim() === "") {
    alert("Por favor, completa los campos correctamente.");
    return;
  }

  // Actualizar el gasto en la lista
  transaccion.editarGasto(indexEnEdicion, cantidad, descripcion, fecha);

  // Restablecer el formulario y botones
  formGasto.reset();
  botonAgregar.style.display = "block";
  botonActualizar.style.display = "none";

  // Actualizar la vista
  mostrarHistorialGastos();
  actualizarSaldoTotal();
});

// Mostrar historial de ingresos en la interfaz
const mostrarHistorialIngresos = () => {
  const cuerpoHistorialIngresos = document.getElementById(
    "cuerpo-historial-ingresos"
  );
  cuerpoHistorialIngresos.innerHTML = "";

  transaccion.obtenerHistorialIngresos().forEach((ingreso) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>$${ingreso.cantidad}</td>
      <td>${ingreso.descripcion}</td>
      <td>${ingreso.fecha}</td>
    `;
    cuerpoHistorialIngresos.appendChild(fila);
  });
};

// Guardar un gasto en localStorage
document.getElementById("form-gasto").addEventListener("submit", (event) => {
  event.preventDefault();

  const cantidad = parseFloat(document.getElementById("cantidad-gasto").value);
  const descripcion = document.getElementById("descripcion-gasto").value;
  const fecha = new Date().toLocaleDateString();

  transaccion.registrarGasto(cantidad, descripcion, fecha);
  guardarEnLocalStorage("gastos", transaccion.obtenerHistorialGastos());

  mostrarHistorialGastos();
  actualizarSaldoTotal();
});

// Guardar un ingreso en localStorage
document.getElementById("form-ingreso").addEventListener("submit", (event) => {
  event.preventDefault();

  const cantidad = parseFloat(
    document.getElementById("cantidad-ingreso").value
  );
  const descripcion = document.getElementById("descripcion-ingreso").value;
  const fecha = new Date().toLocaleDateString();

  transaccion.registrarIngreso(cantidad, descripcion, fecha);
  guardarEnLocalStorage("ingresos", transaccion.obtenerHistorialIngresos());
  mostrarHistorialIngresos();
  actualizarSaldoTotal();
});

// Guardar el objetivo en localStorage
document
  .getElementById("form-objetivo-ahorro")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const descripcionObjetivo = document.getElementById(
      "descripcion-objetivo"
    ).value;
    const cantidadObjetivo = parseFloat(
      document.getElementById("cantidad-objetivo").value
    );

    objetivoAhorro.crearObjetivo(descripcionObjetivo, cantidadObjetivo);
    guardarEnLocalStorage("objetivo", objetivoAhorro.obtenerDetallesObjetivo());

    const objetivoCreado = document.getElementById("objetivo-creado");
    objetivoCreado.textContent = `Objetivo: ${descripcionObjetivo} - Meta: $${cantidadObjetivo}`;
    objetivoCreado.style.display = "block";
  });

// Función para cargar datos desde `localStorage`
const cargarDatos = () => {
  const gastosGuardados = obtenerDeLocalStorage("gastos");
  if (gastosGuardados) {
    gastosGuardados.forEach((gasto) =>
      transaccion.registrarGasto(gasto.cantidad, gasto.descripcion, gasto.fecha)
    );
    mostrarHistorialGastos();
  }

  const ingresosGuardados = obtenerDeLocalStorage("ingresos");
  if (ingresosGuardados) {
    ingresosGuardados.forEach((ingreso) =>
      transaccion.registrarIngreso(
        ingreso.cantidad,
        ingreso.descripcion,
        ingreso.fecha
      )
    );
    mostrarHistorialIngresos();
  }

  const saldoGuardado = obtenerDeLocalStorage("saldoTotal");
  if (saldoGuardado !== null) {
    document.getElementById("saldo-total").textContent = `$${saldoGuardado}`;
  }

  const objetivoGuardado = obtenerDeLocalStorage("objetivo");
  if (objetivoGuardado) {
    const objetivoCreado = document.getElementById("objetivo-creado");
    objetivoCreado.textContent = `Objetivo: ${objetivoGuardado.descripcion} - Meta: $${objetivoGuardado.cantidadObjetivo}`;
    objetivoCreado.style.display = "block";
  }
};
