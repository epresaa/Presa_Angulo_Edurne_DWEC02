'use strict'

console.log('Empieza el programa');

// ------------------- VARIABLES GLOBALES ------------------------
// Capturamos el formulario de introduccion de socios - Ejercicio 1
const formulario = document.querySelector('#formNombre');

// Capturamos el contenedor donde escribiremos los socios - Ejercicio 2
const contenedorEscribirSocios = document.getElementById('contenedorPintarSocios');


// ------------------- CLASE SOCIO ------------------------------
class Socio {
  constructor(nombre, apellido, id) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.id = id;
  }
}

// Constante array para añadir los socios
const arraySocios = [];

// Se cargan los datos del fichero JSON
cargarSociosJSON();


// ------------------- FUNCIONES ------------------------

// EJERCICIO 1

// Función que lee el JSON 
function cargarSociosJSON () {
  let path = 'model/datosSocios.json'

  let request = new Request(path, {
    headers: new Headers({
      'Content-Type': 'text/json'
    }),
    method: 'GET'
  })

  fetch(request).then(response => {
    response.json().then(data => {
      console.log('Datos', data);
      
      // Añadimos los socios iniciales cuando empieza el programa
      aniadirSociosInicialesArray(data);
    })
  })
}

// Funcion que añade socios al array cuando arranca la página web
function aniadirSociosInicialesArray(data) {
  for(let i = 0; i < data.length; i++) {
    let nombre = data[i].fnombre;
    let apellido = data[i].fapellido;
    let ident = data[i].id;
    let socio = new Socio(nombre, apellido, ident);
    arraySocios.push(socio);
  }
}


// EJERCICIO 2

// Función que captura los datos del socio introducidos en el formulario
function capturarDatosSocio () {
  let nombreForm = document.getElementById("fnombre").value;
  let apellidoForm = document.getElementById("fapellido").value;
  
  crearSocio(nombreForm, apellidoForm);
}

// Función que crea un socio pasándole el nombre y el apellido y lo añade al array
function crearSocio (nombre, apellido) {
  let idNuevo = crearID();
  let nuevoSocio = new Socio(nombre, apellido, idNuevo);
  arraySocios.push(nuevoSocio);
}

// Función que crea un ID de socio a en función del último id en el array de socios
function crearID () {
  return arraySocios.length + 1;
}


// EJERCICIO 3

// Función que elimina la lista pintada previamente, recorre array y pinta socios 
function pintarListaSocios () {
  //Borramos todo lo que hay en el div
  vaciarDiv();
  
  //Bucle para recorrer y pintar el array de socios
  for(let i = 0; i < arraySocios.length; i++) {
    document.getElementById("contenedorPintarSocios").innerHTML += "<br>Socio número " + arraySocios[i].id + ": " + arraySocios[i].nombre + " " + arraySocios[i].apellido + "<br><br>";
  }
}

// Función que deja en blanco el elemento div donde se pinta la lista de socios
function vaciarDiv() {
  document.getElementById("contenedorPintarSocios").innerHTML = "";
}

console.log('Acaba el programa')