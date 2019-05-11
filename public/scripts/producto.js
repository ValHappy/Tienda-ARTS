function paginaCargada() {
    var listaProductos = [];
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

    var botonProductoDetalle = document.querySelector('.acciones__btn');

    function agregarAlCarritoDetalle() {
        var nombre = document.querySelector('.producto-detallado__nombre').innerText;
        var precio = document.querySelector('.producto-detallado__precio').innerText;
        var imagen = document.querySelector('.vista-detallada__img').src;
        var _id = document.querySelector('.item__id').value;
        var categoria = document.querySelector('.item__c').value;
        var tipo = document.querySelector('.item__t').value;
        var cantidad = document.querySelector('.acciones__cantidad-btn').value;
        cantidad = parseInt(cantidad);
        console.log(cantidad);
        var producto = listaProductos.find(producto => producto._id == _id);
        if (producto) {
            producto.cantidad += cantidad;
        }
        else {
            var producto = {
                _id: _id,
                cantidad: cantidad,
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
    botonProductoDetalle.addEventListener('click', agregarAlCarritoDetalle);

}
window.addEventListener('load', paginaCargada);
