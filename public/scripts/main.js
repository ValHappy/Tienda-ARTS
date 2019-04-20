//Navbar
function myFunction() {
  var x = document.getElementById("nav");
  if (x.className === "menu__nav") {
    x.className += " responsive";
  } else {
    x.className = "menu__nav";
  }
}

//Gallery
var imagenes = [
  '../img/noche.jpg',
  '../img/puente.jpeg',
  '../img/bosque.jpg',
];
var subtitulos = [
  'La noche estrellada',
  'La estrellada noche',
  'adallertse ehcon al'
];
var textos = [
  'Hecha con los oleos de más alta calidad por Van Gogh, escenarios pincelados y llenos de color que provocan fijar a mirada',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
];

var contador = 0;
var max = 2;
var min = 0;

function siguienteInformacion() {
  if (contador == max) {
    contador = min;
  }
  else {
    contador += 1;
  }
  // console.log(contador);
  actualizarInformacion();
}

function anteriorInformacion() {
  if (contador == min) {
    contador = max;
  } else {
    contador -= 1;
  }
  // console.log(contador);
  actualizarInformacion();
}

function actualizarInformacion() {
  var subtitulo = document.getElementById('photo_title');
  subtitulo.innerText = subtitulos[contador];
  var texto = document.getElementById('photo_Text');
  texto.innerText = textos[contador];
  var foto = document.getElementById('photo');
  foto.style.backgroundImage = 'url(' + imagenes[contador] + ')';
}

function responderCarga() {
  contador = 0;
  max = 2;
  min = 0;
  actualizarInformacion();
}

window.addEventListener('load', responderCarga);