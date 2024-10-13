import { hashSync } from 'bcrypt'
import { randomUUID } from 'crypto'
import { Router } from 'express'

import { handleAppAuthorization } from '../middlewares/handleAppAuthorization.mdw'
import { PrismaDbConnection } from '../PrismaDbConnection'
import { UsuarioRepository } from '../UserRepository'

export const usersRouter = Router()

usersRouter.post('/', async (req, res) => {
  const dbConnection = PrismaDbConnection.getPrismaDbConnection()
  const userRepository = new UsuarioRepository(dbConnection)
  const hashedPassword = hashSync(req.body.password, 10)
  const userId = randomUUID()
  const userData = {
    userId,
    email: req.body.email,
    username: req.body.username,
    nickname: req.body.nickname,
    password: hashedPassword,
  }
  const user = await userRepository.save(userData)
  const userOutput = {
    userId: user.userId,
    email: user.email,
    username: user.username,
    nickname: user.nickname,
  }
  return res.status(201).json(userOutput)
})

usersRouter.get('/', handleAppAuthorization, async (req, res) => {
  const dbConnection = PrismaDbConnection.getPrismaDbConnection()
  const userRepository = new UsuarioRepository(dbConnection)
  const users = await userRepository.findAll()
  const usersOutput = users.map((user) => ({
    userId: user.userId,
    email: user.email,
    username: user.username,
    nickname: user.nickname,
  }))
  return res.status(200).json(usersOutput)
})

usersRouter.get('/:userId', handleAppAuthorization, async (req, res) => {
  const dbConnection = PrismaDbConnection.getPrismaDbConnection()
  const userRepository = new UsuarioRepository(dbConnection)
  const user = await userRepository.findByUserId(req.params.userId)
  const userOutput = {
    userId: user?.userId,
    email: user?.email,
    username: user?.username,
    nickname: user?.nickname,
  }
  return res.status(200).json(userOutput)
})

// usersRouter.patch('/:userId', async (req, res) => {
//   const prismaClient = await PrismaDbConnection.getClient()
//   await PrismaDbConnection.connect()
//   const token = req.headers.authorization?.split(' ')[1]
//   const decoded = jwt.verify(token!, `${process.env.JWT_SECRET!}`)
//   console.log(decoded)
//   // const user = await prismaClient.user.update({
//   //   where: {
//   //     userId: req.params.userId,
//   //   },
//   //   data: req.body,
//   // })
//   // await PrismaDbConnection.disconnect()
//   return res.status(200).json()
// })
