function paginaCargada() {
    //Rango de precio en toda la tienda
    var rango = document.querySelector('.input-rango');
    function buscarPorPrecio() {
        console.log(rango.value);

        location.href = '/tienda/Diseño?precio=' + rango.value;
    }
    //si quiero que sea en una seccion (if rango diferente de nulo pase lo de abajo)
    rango.addEventListener('change', buscarPorPrecio);

    var listaProductos = [];
    if(localStorage.getItem('listaProductos') != null){
        var listaProductos = JSON.parse(localStorage.getItem('listaProductos'));
    }

    var carritoNum = document.querySelector('.carrito__items');
    carritoNum.innerHTML = listaProductos.lenght;
    
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
                imagen: imagen
            }
    
            //localStorage solo guarda strings
            //Persiste ante recarga de Pagina
            listaProductos.push(producto);
            //ponerlo en una funcion actualizar carrito
            carritoNum.innerHTML = listaProductos.length;
            localStorage.setItem('listaProductos', JSON.stringify(listaProductos));
        }
        boton.addEventListener('', agregarAlCarrito);
    }
    botones.forEach(recorrerBotones);

}
window.addEventListener('load', paginaCargada)
