import { Router } from 'express'

export const systemRouter = Router()

systemRouter.get('/healthcheck', (req, res) => {
  res.status(200).json({ status: 'ok' })
})
