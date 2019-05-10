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

// Inicialización de mongo
const url = 'mongodb://localhost:27017';
const dbName = 'tienda';
const client = new MongoClient(url);

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
                query.precio = { $lte: parseInt(request.query.precio) };
            }
            var context = {}
            consultar(query).then(docs => {
                context.productos = docs;
                context.categoria = query.categoria;
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
        consultar(query).then(docs => {
            var contexto = {
                productos: docs
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
    response.render('carrito');
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
                //producto : docs[0]
                _id: docs[0]._id,
                nombre: docs[0].nombre,
                precio: docs[0].precio,
                descripcion: docs[0].descripcion,
                imagen: docs[0].imagen
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