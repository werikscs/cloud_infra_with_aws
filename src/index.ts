import 'dotenv/config'
import express from 'express'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'
import { hashSync, compare } from 'bcrypt'

export const prismaClient = new PrismaClient()
export const app = express()

app.use(express.json())

app.get('/healthcheck', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.post('/users', async (req, res) => {
  await prismaClient.$connect()
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
  await prismaClient.$disconnect()
  res.status(201).json(userOutput)
})

app.get('/users', async (req, res) => {
  await prismaClient.$connect()
  const users = await prismaClient.user.findMany()
  await prismaClient.$disconnect()
  res.status(200).json(users)
})

app.get('/users/:userId', async (req, res) => {
  await prismaClient.$connect()
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
  await prismaClient.$disconnect()
  res.status(200).json(userOutput)
})

app.patch('/users/:userId', async (req, res) => {
  await prismaClient.$connect()
  const token = req.headers.authorization?.split(' ')[1]
  const decoded = jwt.verify(token!, `${process.env.JWT_SECRET!}`)
  console.log(decoded)
  // const user = await prismaClient.user.update({
  //   where: {
  //     userId: req.params.userId,
  //   },
  //   data: req.body,
  // })
  // await prismaClient.$disconnect()
  res.status(200).json()
})

app.post('/login', async (req, res) => {
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
