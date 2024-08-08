import 'dotenv/config'
import express from 'express'

export const app = express()

app.use(express.json())

app.get('/healthcheck', (req, res) => {
  res.status(200).json({ status: 'ok' })
})
