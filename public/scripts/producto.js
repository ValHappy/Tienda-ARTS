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
        var cantidad = parseInt(cantidad);

        var producto = {
            _id: _id,
            id: identificador,
            cantidad: cantidad,
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            categoria: categoria,
            tipo: tipo
        };

        identificador += 1;
        localStorage.setItem('identificador', identificador);
        
        listaProductos.push(producto);
        actualizarCarrito();
        localStorage.setItem('listaProductos', JSON.stringify(listaProductos));
    }
    botonProductoDetalle.addEventListener('click', agregarAlCarritoDetalle);
    
}
window.addEventListener('load', paginaCargada);
