import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import routes from './routes'
import errorHandler from './middlewares/errorHandler'
import './config/mongoose'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use('/', routes)
app.use(errorHandler)
export default app
