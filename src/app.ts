import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import routes from './routes'
import errorHandler from './middlewares/errorHandler'
import './config/mongoose'
import './cron'

declare global {
  namespace Express {
    interface Request {
      device_token: string | string[]
      subscription: string[]
    }
  }
}

const app = express()

app.use(morgan('dev'))
app.use(cors({ exposedHeaders: ['count'] }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', routes)
app.use(errorHandler)
export default app
