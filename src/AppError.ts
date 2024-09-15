import { HttpStatusCodes } from './http/httpStatusCodesEnum'

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
