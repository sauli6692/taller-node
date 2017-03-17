var express = require('express');

// Función encargada de realizar toda la configuración de la ruta (/books)
var routes = function(bookModel) {
    // Instanciación de un enrutador de express
    var bookRouter = express.Router();

    // Definición de una ruta en el enrutador
    bookRouter.route('/')
        // GET: Obtener los datos en el lado del servidor (generalmente de la BD)
        .get(function(req, res) {
            var query = {};

            // req.query: objeto que es enviado desde la url en el cliente
            // Ejemplo: localhost:8000/api/books?author=Autor&genre=Genero

            if (req.query.author != null)
                query.author = req.query.author
            if (req.query.genre != null)
                query.genre = req.query.genre
            if (req.query.title != null)
                query.title = req.query.title
            if (req.query.read != null)
                query.read = req.query.read === 'true';

            
            /*Método que utiliza la librería nedb para buscar registros de una tabla
             Esta implementación puede cambiar dependiendo de la librería a utilizar
             para el manejo de la base de datos.
            
             @param1: Objeto con los valores con que se filtrarán los registros de la tabla
             @param2: Función que se ejecuta cuando ya se han recibido los datos de la BD
            */

            bookModel.find(query, function(err, result) {
                if (err)
                    res.status(500).send(err); // status 500: error interno del servidor
                else
                    res.json(result); // Envia los resultados al cliente en formato JSON
            });
        })
        .post(function(req, res) {
            var newBook = {};

            // req.body: Objeto que se envia desde el cliente en un post/put/patch
            if (req.body.author != null)
                newBook.author = req.body.author
            if (req.body.genre != null)
                newBook.genre = req.body.genre
            if (req.body.title != null)
                newBook.title = req.body.title
            if (req.body.read != null)
                newBook.read = req.body.read;

            // Método de la librería nedb para insertar un registro en la BD
            bookModel.insert(newBook, function(err, savedBook) {
                if (err)
                    res.status(500).send(err);
                else
                    res.status(201).json(savedBook);
            });
        });

    /* Middleware: Intermediario entre el cliente y la ejecución de la ruta.
        :bookID, especifica los parametros de la ruta 
        a los que se accede desde req.params
        Ejemplo: localhost:8000/api/books/1
     */
    bookRouter.use('/:bookID', function(req, res, next) {
    	var filter = {
            _id: req.params.bookID
        };

        // findOne: Selecciona un registro de la BD
        bookModel.findOne(filter, function(err, result) {
            if (err)
                res.status(500).send(err);
            else if(result) {
                req.book = result;
                /* next(): le indica al servidor 
                que pasé a la siguiente tarea de la ruta
                esta puede ser otro middleware o al método especifico (get, post, put)*/
                next();
            } else {
            	res.status(404).send('No book found.');
            }
        });
    });

    // Rutas que trabajan sobre un libro en especifico
    // La request (req) ya ha sido procesada por el middleware
    bookRouter.route('/:bookID')
        .get(function(req, res) {
        	res.json(req.book);
        })
        // Put: Actualización de un objeto completo en la BD
        .put(function(req, res) {

            /* Método de nedb para actualizar objetos 
                @param1: Objeto a ser actulizado.
                @param2: Objeto con los nuevos valores.
                @param3: Objeto para especificar otras opciones (especifico de la librería nedb)
            */
            bookModel.update(req.book, req.body, {}, function(err, updatedRows) {
                if (err)
                    res.status(500).send(err)
                else
                    res.json({
                        updatedRows: updatedRows
                    });
            });
        })
        // Patch: Actualización de las propiedades de un objeto en la BD 
        // (sin afectar las propiedades no incluidas)
        .patch(function(req, res) {
        	var updatedBook = {};

            // Object.keys: devuelve un arreglo con los nombres de las propiedades
            // de un objeto (en este caso req.book).

        	Object.keys(req.book).forEach(function(key) {
        		if(req.body[key] != null && key !== '_id')
        			updatedBook[key] = req.body[key];
        	});

            // $set especifica las propiedades 
            // que se modificaran sin afectar todo el objeto
        	bookModel.update(req.book, { $set: updatedBook }, {}, function(err, updatedRows) {
                if (err)
                    res.status(500).send(err)
                else
                    res.json({
                        updatedRows: updatedRows
                    });
            });
        })
        // delete: Eliminación de un registro de la BD
        .delete(function(req, res) {
            // Método de nedb para eliminar un registro.
        	bookModel.remove({ _id: req.params.bookID }, {}, function (err, numRemoved) {
			  if (err)
                    res.status(500).send(err)
                else
                    res.status(204).send('Removed');
			});
        });

    return bookRouter;
};

module.exports = routes;
