// Definición de códigos de error
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
  SUCCESS: '_Success',
  CREATED: '_Items successfully created',
  BAD_REQUEST: '_Invalid data',
  UNAUTHORIZED: '_Unauthorized access',
  FORBIDDEN: '_Prohibited access',
  NOT_FOUND: '_Item wad not found',
  SERVER_ERROR: '_Unexpected error',
});

module.exports = {
  HttpStatus,
  HttpResponseMessage,
};
