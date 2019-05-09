function paginaCargada() {

  var listaProductos = [];
  var carritoNum = document.querySelector('.carrito__items');
  if (localStorage.getItem('listaProductos') != null) {
    listaProductos = JSON.parse(localStorage.getItem('listaProductos'));
  }


  function actualizarCarrito() {
    carritoNum.innerHTML = listaProductos.length;
    // localStorage.removeItem('listaProductos');
    // listaProductos = [];
  }

  actualizarCarrito();

  var botones = document.querySelectorAll('.item__btn');
  function recorrerBotones(boton) {
    function agregarAlCarrito() {
      var padre = boton.parentNode;
      var nombre = padre.querySelector('.item__nombre').innerText;
      var precio = padre.querySelector('.item__precio').innerText;
      var imagen = padre.querySelector('.item__img').src;
      var producto = {
        nombre: nombre,
        precio: precio,
        imagen: imagen,
      };

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