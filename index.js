var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

app.use(express.static('public'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

var productos = [
    {
        titulo: 'Perro',
        descripcion: 'hola',
        precio: '15681',
        tipo: 'nuevo',
        foto: 'https://estaticos.muyinteresante.es/media/cache/760x570_thumb/uploads/images/article/5c3871215bafe83b078adbe3/perro.jpg'
    },
    {
        titulo: 'Gato',
        descripcion: 'Adios',
        tipo: 'destacado',
        foto: 'https://www.royalcanin.es/wp-content/uploads/2017/10/bigotesnew.jpg'
    }
];

app.get('/', function (request, response) {
    response.render('home');
});

app.get('/tienda', function (request, response) {
    response.render('tienda');
});

app.get('/tienda/:tipo', function (request, response) {
    var contexto = null;
    var tipo = request.params.tipo;
    if (tipo == 'nuevo') {
        // Aqui van los productos nuevos
        
    }
    else if (tipo == 'promociones') {
        // Aqui van los productos con promociones
    }
    else if (tipo == 'destacado') {
        // Aqui van los productos destacados
    }
    else {
        // Aqui nuevamente van todos los productos
        response.render('tienda');
    }
 
});

app.get('/tienda/producto/:producto', function (req, res) {
    var contexto = null;
    var nombreProducto = req.params.producto;

    productos.forEach(function (producto) {
        if (producto.titulo.toLowerCase() == nombreProducto) {
            contexto = producto;
        }
    });
    console.log(req.params.producto);

    if (contexto == null) {
        contexto = {
            error: 'No encontré ningún producto con el nombre ' + nombreProducto
        };
        res.render('producto', contexto);
    } else {
        res.render('producto', contexto);
    }
});

console.log("Servidor iniciado...");
app.listen(3000);