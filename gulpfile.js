// Gulp: Gestor de tareas de Node (Aconsejable investigar)

var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'); // Librería para "observar" los archivos del servidor

/* Definición de una task: 
 	@param1: Nombre de la task.
 	@param2: Función que se ejecutará al momento de correr una task.
*/
gulp.task('default', function() {

	// Llamado que inicia la "observación" de los archivos
	nodemon({
		script: 'index.js', // Archivo que se corre al reiniciar el servidor
		ext: 'js', // Extensión de archivos a observar
		env: {     // Ambiente (enviroment) en el que se ejecuta el servidor
			PORT: 8000 
		},
		ignore: ['./node_modules/**'] // Carpetas/Archivos a ignorar
	})
	.on('restart', function() {
		console.log('Restarting...');
	});
});
