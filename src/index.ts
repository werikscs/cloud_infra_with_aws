import 'dotenv/config'
import express from 'express'
import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'
import { hashSync } from 'bcrypt'

const prismaClient = new PrismaClient()

export const app = express()

app.use(express.json())

app.get('/healthcheck', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.post('/users', async (req, res) => {
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
  await prismaClient.$disconnect()
  res.status(201).json({ user })
})

app.get('/users', async (req, res) => {
  const users = await prismaClient.user.findMany()
  await prismaClient.$disconnect()
  res.status(200).json({ users })
})

app.get('/users/:userId', async (req, res) => {
  const user = await prismaClient.user.findUnique({
    where: {
      userId: req.params.userId,
    },
  })
  await prismaClient.$disconnect()
  res.status(200).json({ user })
})
