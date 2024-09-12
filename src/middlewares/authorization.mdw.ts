/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken'
import { HttpStatusCodes } from '../AppError'

export const AUTH_MWD_MSGS = {
  MISSING_AUTHORIZATION_HEADERS: 'Missing authorization headers',
  UNAUTHORIZED: 'Unauthorized',
}

export type Request = {
  headers: {
    authorization?: string
  }
}

export type Response = {
  status: (status: HttpStatusCodes) => {
    json: (data: any) => void
  }
}

export type NextFunction = () => void

export const authorizationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res
      .status(401)
      .json({ message: AUTH_MWD_MSGS.MISSING_AUTHORIZATION_HEADERS })
  }

  const token = authorization.split(' ')[1]

  try {
    jwt.verify(token, `${process.env.JWT_SECRET}`)
  } catch (error) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ message: AUTH_MWD_MSGS.UNAUTHORIZED })
  }

  next()
}
