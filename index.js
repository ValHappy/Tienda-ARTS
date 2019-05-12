var express = require('express');
var exphbs = require('express-handlebars');
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Inicialización del servidor
var app = express();
app.use(express.static('public'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.urlencoded());
app.use(express.json());

// Inicialización de mongo
const url = 'mongodb://localhost:27017';
const dbName = 'tienda';
const client = new MongoClient(url);

var cantidad = 1;

app.get('/', function (request, response) {
    response.render('home');
});

app.get('/tienda/:categoria?/:id?', function (request, response) {
    var contexto = null;
    var query = {};
    if (request.params.categoria) {
        if (request.params.categoria == 'producto' && request.params.id) {
            cargarProducto(request.params.id, response);
        } else {
            query.categoria = request.params.categoria;
            if (request.query.tipo) {
                query.tipo = request.query.tipo;
            }
            if (request.query.precio) {
                var miPrecio = parseInt(request.query.precio);
                cantidad = miPrecio;
                query.precio = { $lte: cantidad };
            }
            var context = {}
            consultar(query).then(docs => {
                context.productos = docs;
                context.categoria = query.categoria;
                context.cantidad = cantidad;
                query2 = { categoria: query.categoria };
                return consultar(query2);
            }).then(docs => {
                context.productoC = docs[0];
                response.render('tienda', context);
            }).catch(error => { });
        }
    } else {
        // Aqui nuevamente van todos los productos
        if (request.query.tipo) {
            query.tipo = request.query.tipo;
        }
        if (request.query.precio) {
            var miPrecio = parseInt(request.query.precio);
            cantidad = miPrecio;
            query.precio = { $lte: cantidad };
        }
        consultar(query).then(docs => {
            var contexto = {
                productos: docs,
                categoria: '',
                cantidad: cantidad
            };
            response.render('tienda', contexto);
        });
    }
});

app.get('/mostrar', function (request, response) {
    mostrarTodos();
    response.render('home');
});

app.get('/carrito', function (request, response) {
    console.log("se ejecuta en NODE");
    response.render('carrito');
});

app.post('/carrito/comprar', function (request, response) {
    pedido = request.body.pedido;
    pedido.productos = JSON.parse(pedido.productos);
    client.connect(function (err) {
        assert.equal(null, err);
        const db = client.db(dbName);
        const collection = db.collection('pedidos');
        collection.insertOne(pedido, function (err) {
            assert.equal(err, null);
            response.send('compra exitosa.');
        });
        // client.close();
    });
});

function cargarProducto(idProducto, res) {
    client.connect(function (err) {
        assert.equal(null, err);
        const db = client.db(dbName);
        const productos = db.collection('productos');
        var o_id = new mongo.ObjectID(idProducto);
        productos.find({ _id: o_id }).toArray(function (err, docs) {
            assert.equal(err, null);
            var contexto = {
                _id: docs[0]._id,
                nombre: docs[0].nombre,
                precio: docs[0].precio,
                descripcion: docs[0].descripcion,
                imagen: docs[0].imagen,
                categoria: docs[0].categoria,
                tipo: docs[0].tipo,
                cantidad: 1
            };
            res.render('producto', contexto);
        });
    });
}

function mostrarTodos(tipo) {
    client.connect(function (err) {
        assert.equal(null, err);
        const db = client.db(dbName);
        const productos = db.collection('productos');
        productos.find({}).toArray(function (err, docs) {
            assert.equal(err, null);
            return docs;
        });
        client.close();
    });
}

async function consultar(query) {
    return new Promise(function (resolve, reject) {
        client.connect(function (err) {
            assert.equal(null, err);
            const db = client.db(dbName);
            const productos = db.collection('productos');
            productos.find(query).toArray(function (err, docs) {
                assert.equal(err, null);
                resolve(docs);
            });
        });
        // client.close();
    });
}

console.log("Servidor iniciado...");
app.listen(3000);