function paginaCargada() {

  //Filtro por precio



  var listaProductos = [];
  // localStorage.removeItem('listaProductos');
  // localStorage.removeItem('identificador');
  var carritoNum = document.querySelector('.carrito__items');
  if (localStorage.getItem('listaProductos') != null) {
    listaProductos = JSON.parse(localStorage.getItem('listaProductos'));
  }

  function actualizarCarrito() {
    var nuevaCantidad = 0;
    listaProductos.forEach(producto => {
      nuevaCantidad += producto.cantidad;
    });
    carritoNum.innerHTML = nuevaCantidad;
    // localStorage.removeItem('listaProductos');
    // listaProductos = [];
  }

  actualizarCarrito();

  var barra = document.querySelector('.input-rango');
  var precio = barra.value;
  function actualizarPrecio() {
    var iCategoria = document.querySelector(".indicador-categoria");
    var valorICategoria = iCategoria.value;
    console.log(precio);
    if (valorICategoria) {
      location.href = '/tienda/'+valorICategoria+'?precio=' + precio;
    }
    location.href = '/tienda?precio=' + precio;
  }
  barra.addEventListener('change', actualizarPrecio);

  var botones = document.querySelectorAll('.item__btn');

  function recorrerBotones(boton) {

    function agregarAlCarrito() {

      var padre = boton.parentNode;
      var nombre = padre.querySelector('.item__nombre').innerText;
      var precio = padre.querySelector('.item__precio').innerText;
      precio = precio.substring(1, precio.length);
      precio = parseInt(precio);
      var imagen = padre.querySelector('.item__img').src;
      var _id = padre.querySelector('.item__id').value;
      var categoria = padre.querySelector('.item__c').value;
      var tipo = padre.querySelector('.item__t').value;

      var producto = listaProductos.find(producto => producto._id == _id);
      if (producto) {
        producto.cantidad += 1;
      }
      else {
        var producto = {
          _id: _id,
          cantidad: 1,
          nombre: nombre,
          precio: precio,
          imagen: imagen,
          categoria: categoria,
          tipo: tipo
        };
        listaProductos.push(producto);
      }
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