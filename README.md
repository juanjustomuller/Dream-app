Plataforma de Alojamientos Turísticos
Descripción
Esta es una aplicación web para la gestión de alojamientos turísticos. Permite a los usuarios ver alojamientos disponibles para alquilar, aplicar filtros para mejorar la selección, agregar alojamientos a favoritos, y registrarse como anfitrión para publicar sus propios alojamientos. También incluye funcionalidad de autenticación y autorización mediante Bcrypt y JWT.

Tecnologías Utilizadas
Frontend:

React
Redux
HTML
SCSS
Backend:

Node.js
Express
Base de Datos:

MongoDB
Autenticación:

Bcrypt
JWT (JSON Web Tokens)
Funcionalidades
Explorar Alojamientos:

Ver una lista de alojamientos disponibles para alquiler.
Aplicar filtros para refinar la búsqueda según tus preferencias.
Favoritos:

Agregar alojamientos a una lista de favoritos para fácil acceso posterior.
Publicar Alojamientos:

Convertirse en anfitrión y publicar un alojamiento para alquilar mediante un formulario.
Registro e Inicio de Sesión:

Registro de usuarios y anfitriones con autenticación segura utilizando Bcrypt y JWT.
Instalación
Para ejecutar este proyecto localmente, sigue estos pasos:

Clona el repositorio:

bash
Copiar código
git clone <URL_DEL_REPOSITORIO>
Instala las dependencias del frontend:

bash
Copiar código
cd client
npm install
Instala las dependencias del backend:

bash
Copiar código
cd ../server
npm install
Configura la base de datos: Asegúrate de tener una base de datos MongoDB en funcionamiento y configura la conexión en el archivo server/config/db.js.

Configura el entorno: Crea un archivo .env en el directorio server y añade las variables de entorno necesarias para la conexión a la base de datos y la autenticación.

Inicia el servidor backend:

bash
Copiar código
npm start
Inicia el frontend:

bash
Copiar código
cd ../client
npm start
Accede a la aplicación en tu navegador: Abre http://localhost:3000 para ver la aplicación en funcionamiento.

Enlace de la Aplicación
Puedes visitar la aplicación en https://mi-aplicacion-turismo-ejemplo.vercel.app/ (cambia este enlace por el enlace real si está disponible).

Contribuciones
Si deseas contribuir al proyecto, sigue estos pasos:

Haz un fork del repositorio.
Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
Realiza tus cambios y haz commit (git commit -am 'Añadir nueva funcionalidad').
Envía tus cambios a tu repositorio fork (git push origin feature/nueva-funcionalidad).
Abre una Pull Request en este repositorio.
Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
