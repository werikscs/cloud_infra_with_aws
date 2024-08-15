/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken'

export const AUTH_MWD_MSGS = {
  MISSING_AUTHORIZATION_HEADERS: 'Missing authorization headers',
  UNAUTHORIZED: 'Unauthorized',
}

type Request = {
  headers: {
    authorization: string
  }
}

type Response = {
  status: (status: number) => {
    json: (data: any) => void
  }
}

type NextFunction = () => void

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
    return res.status(401).json({ message: AUTH_MWD_MSGS.UNAUTHORIZED })
  }

  next()
}
