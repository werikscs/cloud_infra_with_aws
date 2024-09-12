import 'dotenv/config'
import 'express-async-errors'
import express from 'express'

import { handleAppError } from './middlewares/handleAppError.mdw'
import { router } from './routes'

export const app = express()

app.use(express.json())
app.use(router)
app.use(handleAppError)
