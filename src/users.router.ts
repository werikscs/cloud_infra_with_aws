import { hashSync } from 'bcrypt'
import { randomUUID } from 'crypto'
import { Router } from 'express'
import { PrismaDbConnection } from './dbConnection'
import { authorizationMiddleware } from './authorization.mdw'

export const usersRouter = Router()

usersRouter.post('/', async (req, res) => {
  const prismaClient = await PrismaDbConnection.getClient()
  await PrismaDbConnection.connect()
  const hashedPassword = hashSync(req.body.password, 10)
  const userId = randomUUID()
  const userData = {
    userId,
    email: req.body.email,
    username: req.body.username,
    nickname: req.body.nickname,
    password: hashedPassword,
  }
  const user = await prismaClient.user.create({
    data: userData,
  })
  const userOutput = {
    userId: user.userId,
    email: user.email,
    username: user.username,
    nickname: user.nickname,
  }
  await PrismaDbConnection.disconnect()
  return res.status(201).json(userOutput)
})

usersRouter.get('/', authorizationMiddleware, async (req, res) => {
  const prismaClient = await PrismaDbConnection.getClient()
  await PrismaDbConnection.connect()
  const users = await prismaClient.user.findMany()
  const usersOutput = users.map((user) => ({
    userId: user.userId,
    email: user.email,
    username: user.username,
    nickname: user.nickname,
  }))
  await PrismaDbConnection.disconnect()
  return res.status(200).json(usersOutput)
})

usersRouter.get('/:userId', authorizationMiddleware, async (req, res) => {
  const prismaClient = await PrismaDbConnection.getClient()
  await PrismaDbConnection.connect()
  const user = await prismaClient.user.findUnique({
    where: {
      userId: req.params.userId,
    },
  })
  const userOutput = {
    userId: user?.userId,
    email: user?.email,
    username: user?.username,
    nickname: user?.nickname,
  }
  await PrismaDbConnection.disconnect()
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
