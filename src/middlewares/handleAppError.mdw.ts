/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from '../AppError'
import { NextFunction, Request, Response } from './authorization.mdw'

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
