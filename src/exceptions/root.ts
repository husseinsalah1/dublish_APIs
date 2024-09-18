// message, status code, error codes, and error

class HttpException extends Error {
  constructor(
    public message: string,
    public errorCode: ErrorCodes,
    public statusCode: number,
    public errors: any
  ) {
    super(message);
  }
}

export enum ErrorCodes {
  INTERNAL_EXCEPTION = 500,
  UNPROCESSABLE_ENTITY = 422,
  NOT_FOUND = 404,
  INVALID_PASSWORD = 401,
  DUPLICATE = 409,
  UNAUTHORIZED_ACCESS = 403,
  INVALID_PERMISSIONS = 405,
  INVALID_REFERENCE = 406,
  INVALID_OBJECT_ID = 400,
}

export default HttpException;
