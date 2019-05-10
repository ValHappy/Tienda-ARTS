function paginaCargada() {

  var listaProductos = [];
  var carritoNum = document.querySelector('.carrito__items');
  if (localStorage.getItem('listaProductos') != null) {
    listaProductos = JSON.parse(localStorage.getItem('listaProductos'));
  }

  var identificador = 0;
  if (localStorage.getItem('identificador') != null) {
    identificador = localStorage.getItem('identificador');
  }


  function actualizarCarrito() {
    carritoNum.innerHTML = listaProductos.length;
    //localStorage.removeItem('listaProductos');
    //listaProductos = [];
  }

  actualizarCarrito();

  var botones = document.querySelectorAll('.item__btn');
  function recorrerBotones(boton) {
    function agregarAlCarrito() {
      var padre = boton.parentNode;
      var nombre = padre.querySelector('.item__nombre').innerText;
      var precio = padre.querySelector('.item__precio').innerText;
      var imagen = padre.querySelector('.item__img').src;
      var _id = padre.querySelector('.item__id').value;
      var producto = {
        _id: _id,
        id: identificador,
        cantidad: 1,
        nombre: nombre,
        precio: precio,
        imagen: imagen,
      };
      identificador += 1;
      localStorage.setItem('identificador', identificador);

      listaProductos.push(producto);
      actualizarCarrito();
      localStorage.setItem('listaProductos', JSON.stringify(listaProductos));
    }
    boton.addEventListener('click', agregarAlCarrito);
  }
  botones.forEach(recorrerBotones);

  
}
window.addEventListener('load', paginaCargada);


//Drop Down de Categorias
function desplegar() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}