# Tripleten Sprint 18: Autenticación del back end

Es una página montada en una servidor de Google Cloud, vinculada a un dominio gratuito de FreeDNS.

La página contempla el despliegue de tanto del Front end como del Back end.

![image](https://github.com/user-attachments/assets/4dc79c0c-1d9e-469d-83a8-5380cdd8a7f3)

# URLs

- URL frontend: https://www.ebraulio.chickenkiller.com/
- URL api: https://api.ebraulio.chickenkiller.com/

  
# Front end

Esta parte del proyecto se enfoca en el registro y la autorización en el frontend del proyecto de React "Alrededor de los EE.UU."

\*La página tiene las siguientes funcionalidades:

- Crear rutas y redireccionar
- Crear nuevos componentes de React, para Login, Register, ProtectedRoute e InfoToolTip.
- Conectar la funcionalidad principal del sitio en el backend de TripleTen.
- Nuevos Endpoints: /singup y /singin
- Implementar la autenticación del usuario
- Implementar el almacenamiento local y la manipulación de tokens
- Agregar CORS para evitar XSS

\*La página web esta diseñada con las siguientes tecnologías:

- React.js
- Eslit
- Routes/rutas
- Figma
- Github
- Variable de entorno
- Validator/Clebrate/Joi
- Error Logger
- Request Logger

# Back end

Esta parte del proyecto se enfoca crear una API RESTful para la página del proyecto "Alrededor de los EE. UU.", y la aplicación se conectará a una base de datos.

\*La página tiene las siguientes funcionalidades:

- Uso de MongoDB para la creación de una base de datos NoSQL.
- Crear esquemas y modelos para Users y Cards.
- Utilización de expresiones para validar los datos introducidos en los campos de URL.
- Creación de controladores y rutas para usuarios y tarjetas.
- Manejo de errores con códigos 400, 404, y 500.
- Implementación de funciones y rutas para actualizar perfil, actualizar avatar, dar Like/Dislike a una tarjeta.
- Tecnologías:

\*La página web esta diseñada con las siguientes tecnologías:


- Node.js
- Express.js
- Middlewares
- Eslit
- Routes/rutas
- CORS
- .ENV
- API desplegadada en Google Cloud
- FreeDNS
- SSL
- Password/hash
- pm2
- Nginx

