import { Usuario, ObjetivoAhorro,Transaccion, Categorias } from "./src/clases";

const usuario = Usuario();
const transaccion = Transaccion();
const objetivoAhorro = ObjetivoAhorro();
const categorias = Categorias();

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

document.getElementById("form-categorias").addEventListener("submit", (event) => {
  event.preventDefault();

  const nombreCategoria = document.getElementById("nombre-categoria").value;

  if (nombreCategoria.trim() === "") {
    alert("Por favor, ingresa un nombre válido para la categoría.");
    return;
  }

  categorias.crearCategoria(nombreCategoria);
  const categoriasGuardadas = obtenerDeLocalStorage("categorias") || [];
  categoriasGuardadas.push(nombreCategoria);
  guardarEnLocalStorage("categorias", categoriasGuardadas);

  mostrarCategorias();

  document.getElementById("form-categorias").reset();
});

document.getElementById("selector-categoria").addEventListener("change", (event) => {
  const categoriaSeleccionada = event.target.value;
  const elementoCategoriaSeleccionada = document.getElementById(
    "categoria-seleccionada"
  );

  if (categoriaSeleccionada) {
    elementoCategoriaSeleccionada.textContent = `Categoría seleccionada: ${categoriaSeleccionada}`;
  } else {
    elementoCategoriaSeleccionada.textContent = "";
  }
});

const mostrarCategorias = () => {
  const categoriasGuardadas = obtenerDeLocalStorage("categorias") || [];
  const listaCategorias = document.getElementById("lista-categorias");
  const selectorCategoria = document.getElementById("selector-categoria");

  listaCategorias.innerHTML = "";
  selectorCategoria.innerHTML =
    '<option value="">Selecciona una categoría</option>';

  categoriasGuardadas.forEach((categoria) => {
    const elementoCategoria = document.createElement("li");
    elementoCategoria.textContent = categoria;
    listaCategorias.appendChild(elementoCategoria);

    // Añadir categoría al selector
    const opcion = document.createElement("option");
    opcion.value = categoria;
    opcion.textContent = categoria;
    selectorCategoria.appendChild(opcion);
  });
};

document.addEventListener("DOMContentLoaded", mostrarCategorias);

// Gestión de Ingresos
// Variables de Referencia para Ingresos
const formIngreso = document.getElementById("form-ingreso");
const botonAgregarIngreso = document.getElementById("btn-agregar-ingreso");
const botonActualizarIngreso = document.getElementById("btn-actualizar-ingreso");
let indexEnEdicionIngreso = null;


// Registrar Ingreso
botonAgregarIngreso.addEventListener("click", (e) => {
  e.preventDefault();
  const cantidad = parseFloat(
    document.getElementById("cantidad-ingreso").value
  );
  const descripcion = document.getElementById("descripcion-ingreso").value;
  const fecha = new Date().toLocaleDateString();

  if (isNaN(cantidad) || descripcion.trim() === "") {
    alert("Por favor, completa los campos correctamente.");
    return;
  }

  transaccion.registrarIngreso(cantidad, descripcion, fecha);
  guardarEnLocalStorage("ingresos", transaccion.obtenerHistorialIngresos());
  mostrarHistorialIngresos();
  actualizarSaldoTotal();
  formIngreso.reset();
});


// Editar y Eliminar Ingresos
document.getElementById("cuerpo-historial-ingresos").addEventListener("click", (event) => {
    const boton = event.target;

    // Editar ingreso
    if (boton.classList.contains("editar-btn-ingreso")) {
      const index = boton.dataset.index;
      const ingreso = transaccion.obtenerHistorialIngresos()[index];

      document.getElementById("cantidad-ingreso").value = ingreso.cantidad;
      document.getElementById("descripcion-ingreso").value = ingreso.descripcion;

      indexEnEdicionIngreso = index;
      botonAgregarIngreso.style.display = "none";
      botonActualizarIngreso.style.display = "block";
    }
    // Eliminar Ingreso
    if (boton.classList.contains("eliminar-btn-ingreso")) {
      const index = boton.dataset.index;
      transaccion.eliminarIngreso(index);
      mostrarHistorialIngresos();
      actualizarSaldoTotal();
    }
  });

// Actualizar Ingreso Existente
botonActualizarIngreso.addEventListener("click", () => {
  const cantidad = parseFloat(
    document.getElementById("cantidad-ingreso").value
  );
  const descripcion = document.getElementById("descripcion-ingreso").value;
  const fecha = new Date().toLocaleDateString();

  if (isNaN(cantidad) || descripcion.trim() === "") {
    alert("Por favor, completa los campos correctamente.");
    return;
  }
  transaccion.editarIngreso(
    indexEnEdicionIngreso,
    cantidad,
    descripcion,
    fecha
  );
  // Restablecer el formulario y botones
  formIngreso.reset();
  botonAgregarIngreso.style.display = "block";
  botonActualizarIngreso.style.display = "none";
  guardarEnLocalStorage("ingresos", transaccion.obtenerHistorialIngresos());
  mostrarHistorialIngresos();
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


// Mostrar Historial de Ingresos
const mostrarHistorialIngresos = () => {
  const cuerpoHistorialIngresos = document.getElementById
  ("cuerpo-historial-ingresos");
  cuerpoHistorialIngresos.innerHTML = "";
  const ingresos = transaccion.obtenerHistorialIngresos();

  ingresos.forEach((ingreso, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${ingreso.cantidad}</td>
      <td>${ingreso.descripcion}</td>
      <td>${ingreso.fecha}</td>
      <td>
        <button class="editar-btn-ingreso" data-index="${index}">Editar</button>
        <button class="eliminar-btn-ingreso" data-index="${index}">Eliminar</button>
      </td>
    `;
    cuerpoHistorialIngresos.appendChild(fila);
  });
}


// Referencias a botones y elementos del DOM
const botonAgregar = document.getElementById("btn-agregar");
const botonActualizar = document.getElementById("btn-actualizar");
const formGasto = document.getElementById("form-gasto");
// Variable para almacenar el índice del gasto en edición
let indexEnEdicion = null;

// Registrar nuevo gasto
botonAgregar.addEventListener("click", (e) => {
  e.preventDefault();
  const cantidad = parseFloat(
    document.getElementById("cantidad-gasto").value
  );
  const descripcion = document.getElementById("descripcion-gasto").value;
  const categoria = document.getElementById("selector-categoria").value;
  const fecha = new Date().toLocaleDateString();

  if (isNaN(cantidad) || descripcion.trim() === "") {
    alert("Por favor, completa todos los campos correctamente.");
    return;
  }

  if (categoria) {
    transaccion.registrarGasto(
      cantidad,
      descripcion,
      fecha,
      categoria
      
    );
  } else {
    transaccion.registrarGasto(cantidad, descripcion, fecha,'sin categoria');
  }

  document.getElementById("categoria-seleccionada").textContent = "";
  guardarEnLocalStorage("gastos", transaccion.obtenerHistorialGastos());
  mostrarHistorialGastos();
  actualizarSaldoTotal();
  formGasto.reset();
});


// Editar o eliminar Gastos
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
      document.getElementById("selector-categoria").value = gasto.categoria;

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

// Actualizar un gasto existente
botonActualizar.addEventListener("click", () => {
  const cantidad = parseFloat(document.getElementById("cantidad-gasto").value);
  const descripcion = document.getElementById("descripcion-gasto").value;
  const fecha = new Date().toLocaleDateString();
  const categoria = document.getElementById("selector-categoria").value;

  if (isNaN(cantidad) || descripcion.trim() === "") {
    alert("Por favor, completa los campos correctamente.");
    return;
  }
  // Actualizar el gasto en la lista
  transaccion.editarGasto(
    indexEnEdicion, 
    cantidad, 
    descripcion, 
    categoria,
    fecha
  );
  // Restablecer el formulario y botones
  formGasto.reset();
  botonAgregar.style.display = "block";
  botonActualizar.style.display = "none";
  // Actualizar la vista
  guardarEnLocalStorage("gastos", transaccion.obtenerHistorialGastos());
  mostrarHistorialGastos();
  actualizarSaldoTotal();
});

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


// Función para mostrar el historial de gastos
const mostrarHistorialGastos = () => {
  const cuerpoHistorial = document.getElementById("cuerpo-historial-gastos");
  cuerpoHistorial.innerHTML = "";
  const gastos = transaccion.obtenerHistorialGastos();

  gastos.forEach((gasto, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${gasto.cantidad}</td>
      <td>${gasto.descripcion}</td>
      <td>${gasto.categoria}</td>
      <td>${gasto.fecha}</td>
      <td>
        <button class="editar-btn" data-index="${index}">Editar</button>
        <button class="eliminar-btn" data-index="${index}">Eliminar</button>
      </td>
    `;
    cuerpoHistorial.appendChild(fila);
  });
}

// Variable para guardar el índice del objetivo que se está editando
let indiceEdicion = null;

// Mostrar todos los objetivos guardados
const mostrarObjetivos = () => {
  const listaObjetivos = document.getElementById("lista-objetivos");
  listaObjetivos.innerHTML = ""; // Limpiar la lista antes de actualizar

  const objetivos = objetivoAhorro.obtenerObjetivos();
  objetivos.forEach((objetivo, index) => {
    const elemento = document.createElement("li");
    elemento.innerHTML = `
      <strong>${objetivo.descripcion}</strong>: $${objetivo.cantidadObjetivo.toFixed(2)}
      <button class="editar-objetivo" data-index="${index}">Editar</button>
      <button class="completar-objetivo" data-index="${index}">Completado</button>
    `;
    listaObjetivos.appendChild(elemento);
  });
};

// Cargar los objetivos al inicio
const cargarObjetivosIniciales = () => {
  const objetivosGuardados = obtenerDeLocalStorage("objetivos");
  if (objetivosGuardados) {
    objetivoAhorro.cargarObjetivos(objetivosGuardados);
    mostrarObjetivos();
  }
};

// Cambiar el texto del botón según el estado (editar o cargar)
const actualizarTextoBoton = () => {
  const botonSubmit = document.getElementById("btn-guardar-objetivo");
  botonSubmit.textContent = indiceEdicion !== null ? "Editar Objetivo" : "Cargar Objetivo";
};

// Guardar un nuevo objetivo o editar uno existente
document.getElementById("form-objetivo-ahorro").addEventListener("submit", (event) => {
  event.preventDefault();

  const descripcionObjetivo = document.getElementById("descripcion-objetivo").value;
  const cantidadObjetivo = parseFloat(document.getElementById("cantidad-objetivo").value);

  if (descripcionObjetivo.trim() === "" || isNaN(cantidadObjetivo)) {
    alert("Por favor, completa todos los campos correctamente.");
    return;
  }

  if (indiceEdicion !== null) {
    // Editar objetivo existente
    const objetivos = objetivoAhorro.obtenerObjetivos();
    objetivos[indiceEdicion] = { descripcion: descripcionObjetivo, cantidadObjetivo };
    guardarEnLocalStorage("objetivos", objetivos);
    indiceEdicion = null;
  } else {
    // Crear nuevo objetivo
    objetivoAhorro.crearObjetivo(descripcionObjetivo, cantidadObjetivo);
    guardarEnLocalStorage("objetivos", objetivoAhorro.obtenerObjetivos());
  }

  mostrarObjetivos();
  document.getElementById("form-objetivo-ahorro").reset();
  actualizarTextoBoton(); // Restablecer el texto del botón
});

// Completar o editar un objetivo
document.getElementById("lista-objetivos").addEventListener("click", (event) => {
  const objetivos = objetivoAhorro.obtenerObjetivos();

  if (event.target.classList.contains("completar-objetivo")) {
    const index = event.target.dataset.index;
    objetivos.splice(index, 1);

    // Actualizar localStorage
    guardarEnLocalStorage("objetivos", objetivos);

    mostrarObjetivos();
  }

  if (event.target.classList.contains("editar-objetivo")) {
    const index = event.target.dataset.index;
    const objetivo = objetivos[index];

    // Cargar datos en el formulario
    document.getElementById("descripcion-objetivo").value = objetivo.descripcion;
    document.getElementById("cantidad-objetivo").value = objetivo.cantidadObjetivo;

    indiceEdicion = index; // Guardar el índice del objetivo que se está editando
    actualizarTextoBoton(); // Cambiar texto del botón a "Editar Objetivo"
  }
});

// Llamar al cargar objetivos iniciales al inicio
cargarObjetivosIniciales();

// Función para cargar datos desde `localStorage`
const cargarDatos = () => {
  const gastosGuardados = obtenerDeLocalStorage("gastos");
  if (gastosGuardados) {
    gastosGuardados.forEach((gasto) =>
      transaccion.registrarGasto(gasto.cantidad, gasto.descripcion, gasto.fecha, gasto.categoria)
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

  const categoriasGuardadas = obtenerDeLocalStorage("categorias");
  if (categoriasGuardadas) {
    categoriasGuardadas.forEach((categoria) =>
      categorias.crearCategoria(categoria)
    );
    mostrarCategorias();
  }
};

// Actualizar saldo total y guardar en localStorage
const actualizarSaldoTotal = () => {
  const saldoTotal = transaccion.calcularSaldoTotal();
  document.getElementById("saldo-total").textContent = `$${saldoTotal}`;
  guardarEnLocalStorage("saldoTotal", saldoTotal);
};