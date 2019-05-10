
var medioPago = "Efectivo";
function pantallaCargada() {
    var listaProductos = [];
    var subTotal = 0;
    var envio = 4000;
    var total = 0;
    
    console.log("funciona");
    
    
    function cargarLista() {
        if (localStorage.getItem('listaProductos') != null) {
            listaProductos = JSON.parse(localStorage.getItem('listaProductos'));
        }
    }
    
    function actualizarSaldos() {
      
        for (let i = 0; i < listaProductos.length; i++) {
            const producto = listaProductos[i];
            var cant = producto.cantidad;
            var pre = producto.precio;
            var calculo = cant * pre;
            subTotal += calculo;
        }
        var subTotalEtiqueta = document.querySelector('.carrito-resumen__subtotal-valor');
        subTotalEtiqueta.innerHTML = '$' + subTotal;
        
        if (listaProductos.length == 0) {
            envio = 0;
        }
        var envioEtiqueta = document.querySelector('.carrito-resumen__envio-valor');
        envioEtiqueta.innerHTML = '$' + envio;
        var totalEtiqueta = document.querySelector('.carrito-resumen__total-valor');
        total = subTotal + envio;
        totalEtiqueta.innerHTML = '$' + total;
    }
    
    
    
    var listaCarrito = document.querySelector('.lista__carrito');
    function actualizarCarrito() {
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
            '<p class="producto__precio">' + producto.precio + '</p>' +
            '<input type="hidden" class="producto__id" value="' + producto.id + '"></input>' +
            '<div>' +
            '<input class="producto__cantidad" type="number" min="1" max="100" value="' + producto.cantidad + '" />' +
            '</div>' +
            '</div>' +
            '<div class="producto__x">' +
            '<a class="producto__x-item"><i class="far fa-times-circle fa-2x "></i></a>' +
            '</div>' +
            '</div>';
            //'<img src="' + producto.imagen + '" width="50">' + producto.nombre;
        });
    }
    
    actualizarCarrito();
    
    // Esta elimina productos
    var botones = document.querySelectorAll('.producto__x-item');
    function recorrerCarrito(boton) {
        // console.log("se recorre el carrito");
        function eliminarProducto() {
            
            var padre = boton.parentNode.parentNode;
            var id = padre.querySelector('.producto__id').value;
            var terminado = false;
            
            for (var i = 0; i < listaProductos.length && !terminado; i++) {
                
                if (listaProductos[i].id === id) {
                    listaProductos.splice(i, 1);
                    // console.log("Lo eliminó");
                    terminado = true;
                    localStorage.setItem('listaProductos', JSON.stringify(listaProductos));
                    actualizarCarrito();
                    botones = document.querySelectorAll('.producto__x-item');
                    botones.forEach(recorrerCarrito);
                }
            }
        }
        boton.addEventListener('click', eliminarProducto);
    }
    botones.forEach(recorrerCarrito);
    
    
    var cantidades = document.querySelectorAll('.producto__cantidad');
    
    function actualizarCantidades(cantidad) {
        function actualizar() {
            var padre = cantidad.parentNode.parentNode;
            var id = padre.querySelector('.producto__id').value;
            var terminado = false;
            
            for (var i = 0; i < listaProductos.length && !terminado; i++) {
                
                if (listaProductos[i].id === id) {
                    nuevaCantidad = parseInt(cantidad.value);
                    listaProductos[i].cantidad = nuevaCantidad;
                    terminado = true;
                    localStorage.setItem('listaProductos', JSON.stringify(listaProductos));
                    actualizarCarrito();
                    console.log("evento");
                    cantidades = document.querySelectorAll('.producto__cantidad');
                    cantidades.forEach(actualizarCantidades);
                }
            }
            
        }
        cantidad.addEventListener("change", actualizar);
    }
    cantidades.forEach(actualizarCantidades);
    
    var botonRegistrar = document.querySelector('.pago-sin__btn');
    
    function registrar() {
        console.log("Alguito");
        
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
        
        if (nombreInput.value && cedulaInput.value && direccionInput.value) {
            
        }
    }
    botonRegistrar.addEventListener("click", registrar);
    
}
window.addEventListener("load", pantallaCargada);



//
function actualizarMedio() {
    var medio = document.querySelector(".pago-sin__info-medio");
    medioPago = medio.value;
}