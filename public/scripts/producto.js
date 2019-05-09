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

    var botonProductoDetalle = document.querySelector('.acciones__btn');

    function agregarAlCarritoDetalle() {
        var nombre = document.querySelector('.producto-detallado__nombre').innerText;
        var precio = document.querySelector('.producto-detallado__precio').innerText;
        var imagen = document.querySelector('.vista-detallada__img').src;
        var producto = {
            nombre: nombre,
            precio: precio,
            imagen: imagen,
        };

        listaProductos.push(producto);
        actualizarCarrito();
        localStorage.setItem('listaProductos', JSON.stringify(listaProductos));
    }
    botonProductoDetalle.addEventListener('click', agregarAlCarritoDetalle);

}
window.addEventListener('load', paginaCargada);
