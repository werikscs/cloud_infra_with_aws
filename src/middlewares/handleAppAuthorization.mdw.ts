/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken'
import { Request } from '../http/requestType'
import { Response } from '../http/responseType'
import { NextFunction } from '../http/nextFunctionType'
import { HttpStatusCodes } from '../http/httpStatusCodesEnum'

export const AUTH_MWD_MSGS = {
  MISSING_AUTHORIZATION_HEADERS: 'Missing authorization headers',
  UNAUTHORIZED: 'Unauthorized',
}

export const handleAppAuthorization = async (
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
