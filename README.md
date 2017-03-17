# taller-node

# Herramientas a instalar:
- NodeJS (Buscar en página oficial)
- Git (incluye git bash) (Buscar en página oficial)
- Postman (extensión de Chrome)
    
# Procedimiento para hacer pruebas:
- Abrir Git Bash y dirigirse al directorio del proyecto (cd ruta/al/directorio/taller-node)
- Ejecutar el comando: `npm install` para instalar las librerías necesarias del proyecto
- Instalar gulp de manera global: `npm install gulp --global`
- Ejecutar el comando `gulp` para iniciar el servidor
- Abrir Postman 
  - Seleccionar el tipo de llamado (GET/POST/PUT/PATCH/DELETE)
  - Para el caso de POST/PUT/PATCH
    - Seleccionar la tab `Body`
    - Seleccionar el radio button `raw`
    - Cambiar combobox del valor `Text` al valor `JSON(application/json)`
    - Ingresar el objeto JSON que se enviará como body en la request
  - Ingresar la dirección del servidor `localhost:8000/api/books` en la sección de la URL y darle click en Send.

# Algunos comando útiles
- `npm install nombre-libreria --save`: Instala una libreria en el proyecto de manera local y la añade a las dependencias en package.json
- `npm install nombre-libreria --global`: Instala una librería de manera global en el sistema.
- `node miArchivo.js`: Ejecuta el archivo "miArchivo"
- `gulp mi-tarea`: Ejecuta la task 'mi-tarea' definida en el archivo gulpfile.js
 
# Investigaciones recomendadas
- Automatización de tareas con Gulp
- Estructura de proyectos en NodeJS
- Templating (Para crear una aplicación cliente)
- MEAN Stack
