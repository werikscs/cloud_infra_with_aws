import { Router } from 'express'

export const systemRouter = Router()

systemRouter.get('/healthcheck', (req, res) => {
  return res.status(200).json({ status: 'ok' })
})
