import jwt from 'jsonwebtoken'
import { compare } from 'bcrypt'
import { Router } from 'express'
import { PrismaDbConnection } from './dbConnection'

export const sessionRouter = Router()

sessionRouter.post('/login', async (req, res) => {
  const prismaClient = await PrismaDbConnection.getClient()
  await prismaClient.$connect()
  const { email, password } = req.body
  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  })
  await compare(password, user!.password)
  const token = jwt.sign(
    { userId: user!.userId },
    `${process.env.JWT_SECRET!}`,
    { expiresIn: '8h' },
  )
  const loginOutput = {
    token,
  }
  await prismaClient.$disconnect()
  res.status(200).json(loginOutput)
})
