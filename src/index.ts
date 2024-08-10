import 'dotenv/config'
import express from 'express'
import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

export const app = express()

app.use(express.json())

app.get('/healthcheck', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.get('/users', async (req, res) => {
  const users = await prismaClient.user.findMany()
  await prismaClient.$disconnect()
  res.status(200).json({ users })
})

app.post('/users', async (req, res) => {
  const user = await prismaClient.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
    },
  })
  await prismaClient.$disconnect()
  res.status(201).json({ user })
})
