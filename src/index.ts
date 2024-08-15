import 'dotenv/config'
import express, { Router } from 'express'

import { usersRouter } from './users.router'
import { sessionRouter } from './session.router'
import { systemRouter } from './system.router'

export const app = express()
const router = Router()

router.use('/users', usersRouter)
router.use('/session', sessionRouter)
router.use('/system', systemRouter)

app.use(express.json())
app.use(router)
