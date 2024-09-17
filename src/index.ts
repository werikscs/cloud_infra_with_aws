import 'dotenv/config'
import 'express-async-errors'
import express from 'express'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'

import { swaggerDocument } from './documentation'
import { handleAppError } from './middlewares/handleAppError.mdw'
import { router } from './routes'

export const app = express()

app.use(express.json())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

if (process.env.NODE_ENV !== 'testing') app.use(morgan('combined'))

app.use(router)
app.use(handleAppError)
