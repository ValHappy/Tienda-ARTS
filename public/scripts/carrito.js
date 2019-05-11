
var medioPago = "Efectivo";
var listaProductos = [];
var subTotal = 0;
var envio = 4000;
var total = 0;

function actualizarPantalla() {
    var listaCarrito = document.querySelector('.lista__carrito');
    cargarLista();
    actualizarSaldos();
    listaCarrito.innerHTML = '';
    listaProductos.forEach(function (producto) {
        listaCarrito.innerHTML +=
        '<div class="producto__contenedor">' +
        '<img class="producto__img" src="' + producto.imagen + '" alt="">' +
        '<div class="producto__contenido">' +
        '<h3 class="producto__nombre">' + producto.nombre + '</h3>' +
        '<h3 class="producto__tipo">' + producto.tipo + '</h3>' +
        '<p class="producto__precio"> $' + producto.precio + '</p>' +
        '<input type="hidden" class="producto__id" value="' + producto._id + '"></input>' +
        '<div>' +
        '<input class="producto__cantidad" type="number" min="1" max="100" value="' + producto.cantidad + '" />' +
        '</div>' +
        '</div>' +
        '<div class="producto__x">' +
        '<a class="producto__x-item" onclick="eliminarProducto(this)">'+
        '<i class="far fa-times-circle fa-2x "></i></a>' +
        '</div>' +
        '</div>';
    });
}
window.addEventListener("load", actualizarPantalla);

function cargarLista() {
    if (localStorage.getItem('listaProductos') != null) {
        listaProductos = JSON.parse(localStorage.getItem('listaProductos'));
    }
}

function actualizarMedio() {
    var medio = document.querySelector(".pago-sin__info-medio");
    medioPago = medio.value;
}

function actualizarSaldos() {
    subTotal = 0;
    total = 0;
    for (let i = 0; i < listaProductos.length; i++) {
        const producto = listaProductos[i];
        var cant = producto.cantidad;
        var pre = producto.precio;
        var calculo = cant * pre;
        subTotal += calculo;
    }
    var subTotalEtiqueta = document.querySelector('.carrito-resumen__subtotal-valor');
    subTotalEtiqueta.innerHTML = '$' + subTotal;
    
    if (!listaProductos.length) {
        envio = 0;
    }
    var envioEtiqueta = document.querySelector('.carrito-resumen__envio-valor');
    envioEtiqueta.innerHTML = '$' + envio;
    var totalEtiqueta = document.querySelector('.carrito-resumen__total-valor');
    total = subTotal + envio;
    totalEtiqueta.innerHTML = '$' + total;
}

function eliminarProducto(elemento) {
    padre = elemento.parentNode.parentNode;
    var id = padre.querySelector('.producto__id').value;
    var producto = listaProductos.find(producto => producto._id == id);
    var indice = listaProductos.indexOf(producto);
    listaProductos.splice(indice, 1);
    localStorage.setItem('listaProductos', JSON.stringify(listaProductos));
    actualizarPantalla();
}

//LO DE GUARDAR UN PEDIDO (EL BOTON TIENE QUE SER TIPO SUBMIT)
// var pedido = {
//     correo: request.body.correo,
//     contrasena: request.body.contrasena,
//     fecha: new Date(),
//     estado: 'nuevo',
// };

// var collection = db.collection('pedidos');
// collection.insertOne(pedido, function(err){
//     assert.equal(err, null);

//     console.log('pedido guardado');
// });

// var contexto = {
//     titulo: 'Página principal',
//     mensaje: 'pedido guardado',
// };


// response.render('home', contexto);

