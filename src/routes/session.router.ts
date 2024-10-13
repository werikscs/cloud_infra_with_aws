import jwt from 'jsonwebtoken'
import { compare } from 'bcrypt'
import { Router } from 'express'
import { UsuarioRepository } from '../UserRepository'
import { PrismaDbConnection } from '../PrismaDbConnection'

export const sessionRouter = Router()

sessionRouter.post('/login', async (req, res) => {
  const { email, password } = req.body
  const dbConnection = await PrismaDbConnection.getPrismaDbConnection()
  const userRepository = new UsuarioRepository(dbConnection)
  const user = await userRepository.find(email)
  await compare(password, user!.password)
  const token = jwt.sign(
    { userId: user!.userId },
    `${process.env.JWT_SECRET!}`,
    { expiresIn: '8h' },
  )
  const loginOutput = {
    token,
  }
  return res.status(200).json(loginOutput)
})
