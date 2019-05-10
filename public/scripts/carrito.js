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
            listaCarrito.innerHTML += 
            
            '<div class="producto__contenedor">'+
            '<img class="producto__img" src="'+ producto.imagen +'" alt="">'+
            '<div class="producto__contenido">'+
                '<h3 class="producto__nombre">'+ producto.nombre +'</h3>'+
                '<h3 class="producto__tipo">'+ producto.tipo +'</h3>'+
                '<p class="producto__precio">'+ producto.precio +'</p>'+
                '<div>'+
                    '<input type="number" min="1" max="100" value="1" />'+
                '</div>'+
            '</div>'+
            '<div class="producto__x">'+
                '<p class="producto__x-item"><i class="far fa-times-circle fa-2x "></i></p>'+
            '</div>'+
        '</div>';
            
            //'<img src="' + producto.imagen + '" width="50">' + producto.nombre;
        });
    }

    actualizarCarrito();
}
window.addEventListener("load", pantallaCargada);