function pantallaCargada() {

    console.log("funciona");
    var listaProductos = [];
    if (localStorage.getItem('listaProductos') != null) {
        listaProductos = JSON.parse(localStorage.getItem('listaProductos'));
    }

    var listaCarrito = document.querySelector('.lista__carrito');
    function actualizarCarrito() {

        listaCarrito.innerHTML = '';
        listaProductos.forEach(function (producto) {
            listaCarrito.innerHTML += '<img src="' + producto.imagen + '" width="50">' + producto.nombre;
        });
    }

    actualizarCarrito();
}
window.addEventListener("load", pantallaCargada);