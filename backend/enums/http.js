// Definición de códigos de error
const HttpStatus = Object.freeze({
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  ALREADY_EXISTS: 409,
  INTERNAL_SERVER_ERROR: 500,
});

const HttpResponseMessage = Object.freeze({
  SUCCESS: '_Success',
  CREATED: '_Items successfully created',
  BAD_REQUEST: '_Invalid data',
  UNAUTHORIZED: '_Unauthorized access',
  FORBIDDEN: '_Prohibited access',
  NOT_FOUND: '_User wad not found with this Id',
  ALREADY_EXISTS: '_Email has already been registered',
  SERVER_ERROR: '_An error has ocurred on the server',
});

module.exports = {
  HttpStatus,
  HttpResponseMessage,
};
