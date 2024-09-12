export enum HttpStatusCodes {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export default class AppError extends Error {
  statusCode: number

  constructor(
    message: string,
    statusCode: HttpStatusCodes = HttpStatusCodes.BAD_REQUEST,
  ) {
    super()

    this.statusCode = statusCode
    this.message = message
  }
}
