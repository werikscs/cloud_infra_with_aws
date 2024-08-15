/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken'

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
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = authorization.split(' ')[1]

  try {
    jwt.verify(token, `${process.env.JWT_SECRET}`)
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  next()
}
