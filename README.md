Sistema de Gestión de Estudiantes 

----Descripcion----
es una aplicación web que automatiza tareas administrativas y académicas en una escuela. El sistema permite:
Registro de Alumnos e inscripción en cursos: El personal administrativo da de alta e inscribe a los alumnos en los cursos correspondientes.
Calificación y Evaluación: Los profesores pueden registrar y modificar las calificaciones de los alumnos.
Comunicación: Los alumnos y padres pueden visualizar sus datos si están registrados.
Inicio de Sesión: basado en el rol del usuario (alumno/padre, profesor o administrador).

----Instrucciones de instalacion----
Instalar NodeJS
Instalar NPM
Con esto instalariamos todas las dependencias necesarias
Corremos la aplicación con el comando npm start para que esta levante el servidor en el puerto 3000. 
Todos los endpoints son accesibles desde la URL http://localhost:3000.

---Instrucciones de uso----
El usuario puede iniciar sesión desde la ruta index de la aplicación (http://localhost:3000) ingresando su legajo y contraseña. 
Según el rol del usuario (alumno/padre, profesor o administrador) es redirigido a una vista específica.

Cada endpoint será accesible dependiendo del rol ingresado en el login. 

----Lista de las tecnologías utilizadas----
NodeJS
Express
MongoDB
JWT
Bcrypt
Jest
Supertest

----Datos de contacto----
Grupo 4 - Omeguitas
losomeguitas@gmail.com



