//only ks
const HttpStatus = Object.freeze({
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
});

const HttpResponseMessage = Object.freeze({
  SUCCESS: 'Exito',
  CREATED: 'Recurso creado con éxito',
  BAD_REQUEST: 'Datos invalidos',
  UNAUTHORIZED: 'Acceso no autorizado',
  FORBIDDEN: 'Acceso prohibido',
  NOT_FOUND: 'Recurso no encontrado',
  SERVER_ERROR: 'Error predeterminado',
});

module.exports = {
  HttpStatus,
  HttpResponseMessage,
};
