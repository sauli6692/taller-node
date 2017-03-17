var express = require('express'), // Manejar el ruteo en el lado del servidor (REST)
	db = require('nedb'), // Librería encargada de manejar la BD local
	bodyParser = require('body-parser'); // Parsea el body de la request del cliente

var app = express(); // Instanciación de la aplicación
var port = process.env.PORT || 3000; // Puerto donde corre el servidor

// Especifica que el body de la request debe parsearse a un JSON
app.use(bodyParser.json());

// Carga del Modelo para manipular la tabla de la BD
var bookModel = new db({ filename: './db/books.db' });
bookModel.loadDatabase();

// Enrutador encargado de la ruta /books
var bookRouter = require('./routes/book.routes.js')(bookModel);

// Asignación del enrutador a la ruta /api/books
app.use('/api/books', bookRouter);

// Ruta por defecto
app.get('/', function(req, res) {
	res.send('HOLA MUNDO DE NODE!');
});

// Inicia el servidor en el puerto(port) indicado
app.listen(port, function() {
	// console.log imprime en la consola del servidor
	console.log('Running on Port: ' + port);
});