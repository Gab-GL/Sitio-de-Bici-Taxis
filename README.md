# Bicitaxi Admin

Sistema administrativo para la gestion de bicitaxis desarrollado con:

- Node.js
- Express
- MySQL
- Docker
- Arquitectura MVC

El proyecto permite administrar:

- Bicitaxis
- Conductores
- Viajes
- Rutas

---

# Descripcion tecnica del sistema

Este sistema implementa una arquitectura **cliente-servidor desacoplada a nivel logico**, donde el backend en Node.js actua como servidor de aplicacion y la base de datos MySQL como capa de persistencia.

El sistema sigue el patron **MVC (Model-View-Controller)**:

- **Controllers**: gestionan la logica de negocio y procesan las solicitudes HTTP.
- **Routes**: definen los endpoints que conectan las peticiones del cliente con los controladores.
- **Views**: plantillas HTML renderizadas desde el backend para la interfaz administrativa.

La comunicacion con la base de datos se realiza mediante el driver **mysql2 con soporte de promesas**, permitiendo el uso de `async/await` para operaciones asincronas.

La aplicacion se ejecuta dentro de un entorno contenerizado con Docker, donde MySQL corre en un contenedor independiente expuesto al backend mediante red interna y puerto mapeado.

---

# Flujo del sistema

## 1. Inicio del sistema

1. Docker levanta el servicio MySQL.
2. MySQL inicializa la base de datos `bicitaxi_db` con sus tablas.
3. Node.js inicia el servidor Express.

---

## 2. Flujo de una peticion HTTP 


1. El cliente (navegador) realiza una peticion:
2. Express recibe la peticion en algun rout
3. La ruta delega al controlador:
5. El modelo controlador ejecuta una accion en CRUD en sql
