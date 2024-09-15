/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from '../AppError'
import { NextFunction } from '../http/nextFunctionType'
import { Request } from '../http/requestType'
import { Response } from '../http/responseType'

export const handleAppError = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    })
  }

  return res.status(500).json({ message: error.message })
}
