
var medioPago = "Efectivo";
var listaProductos = [];
var subTotal = 0;
var envio = 4000;
var total = 0;

var modal = document.querySelector('.modal');
var span = document.getElementsByClassName("cerrar")[0];

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
        '<a class="producto__a" href="/tienda/producto/'+producto._id+'" ><h3 class="producto__nombre">' + producto.nombre + '</h3></a>' +
        '<h3 class="producto__tipo">' + producto.tipo + '</h3>' +
        '<p class="producto__precio">$' + producto.precio + '</p>' +
        '<input type="hidden" class="producto__id" value="' + producto._id + '"></input>' +
        // '<div>' +
        // '<input class="producto__cantidad" onclick="actualizarCantidad(this)" type="number" min="1" max="100" value="' + producto.cantidad + '" change="" />' +
        // '</div>' +
        '<div class="acciones-cantidad">' +
        '<a class="acciones-cantidad__btn" onclick="actualizarCantidad(this, 1)">' +
        '<i class="fas fa-minus"></i></a >' +
        '<p class="acciones-cantidad__num">' + producto.cantidad + '</p>' +
        '<a class="acciones-cantidad__btn" onclick="actualizarCantidad(this, 2)">' +
        '<i class="fas fa-plus"></i></a></div >' +
        '</div>' +
        '<div class="producto__x">' +
        '<a class="producto__x-item" onclick="eliminarProducto(this)">' +
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

function actualizarCantidad(elemento, indicador) {
    padre = elemento.parentNode.parentNode;
    var id = padre.querySelector('.producto__id').value;
    var producto = listaProductos.find(producto => producto._id == id);
    
    if (indicador == 1) {
        if (producto.cantidad > 1) {
            producto.cantidad -= 1;
        }
    } else {
        producto.cantidad += 1;
    }
    
    localStorage.setItem('listaProductos', JSON.stringify(listaProductos));
    actualizarPantalla();
}
var botonRegistrar = document.querySelector('.pago-sin__btn');

function registrar() {
    
    var nombreInput = document.querySelector('.pago-sin__info-nombre');
    var cedulaInput = document.querySelector('.pago-sin__info-cc');
    var direccionInput = document.querySelector('.pago-sin__info-dir');
    
    var nombre = document.querySelector('.campo__nombre');
    var cedula = document.querySelector('.campo__cc');
    var direccion = document.querySelector('.campo__dir');
    
    if (nombreInput.value) {
        nombre.className = 'campo-invisible campo__nombre';
    }
    else {
        nombre.className = 'campo-visible campo__nombre';
    }
    
    if (cedulaInput.value) {
        cedula.className = 'campo-invisible campo__cc';
    }
    else {
        cedula.className = 'campo-visible campo__cc';
    }
    
    if (direccionInput.value) {
        direccion.className = 'campo-invisible campo__dir';
    }
    else {
        direccion.className = 'campo-visible campo__dir';
    }
    if (!listaProductos.length) {
        var contenidoModal = document.querySelector('.modal-contenido__info');
        contenidoModal.innerHTML = '<p>Es obligatorio seleccionar productos en la tienda para realizar el pedido.</p>'
        accionModal();
    }
    
    if (nombreInput.value && cedulaInput.value && direccionInput.value && listaProductos.length) {
        ejecutarPeticion();
    }
}

var peticion = new XMLHttpRequest();
peticion.addEventListener("readystatechange", procesarPeticion, false);

function ejecutarPeticion() {
    peticion.open('POST', "http://localhost:3000/carrito/comprar", true);
    peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var productosComprados = localStorage.getItem('listaProductos');
    
    var nombreInput = document.querySelector('.pago-sin__info-nombre').value;
    var cedulaInput = document.querySelector('.pago-sin__info-cc').value;
    var direccionInput = document.querySelector('.pago-sin__info-dir').value;
    
    var pedido = {
        nombre: nombreInput,
        cedula: cedulaInput,
        direccion: direccionInput,
        fecha: new Date(),
        total: total,
        productos: productosComprados
    };
    peticion.send(JSON.stringify({ pedido }));
}

function procesarPeticion(e) {
    if (peticion.readyState == 4) {
        var resultado = peticion.responseText;
        document.querySelector('.pago-sin__info-nombre').value = "";
        document.querySelector('.pago-sin__info-cc').value = "";
        document.querySelector('.pago-sin__info-dir').value = "";
        var contenidoModal = document.querySelector('.modal-contenido__info');
        contenidoModal.innerHTML = '<p>' + resultado + '</p>'
        accionModal();
        localStorage.setItem('listaProductos', JSON.stringify([]));
        actualizarPantalla();
    }
}


function accionModal() {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


var laCosa = document.querySelector(".carrito__titulo");
var modalWin = document.querySelector(".modal2");
var cerrarModal = document.querySelector(".cerrar2");

function accionarModal(){
    modalWin.style.display = "block";
}
laCosa.addEventListener("click", accionarModal);

cerrarModal.onclick = function () {
    modalWin.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modalWin) {
        modalWin.style.display = "none";
    }
}

