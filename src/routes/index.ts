import { Router } from 'express'
import users from './users'
import fetch from './fetch'
import promos from './promos'

const router = Router()

router.get('/', (req, res) => res.status(200).json({ message: 'Server test ok!' }))

router.use('/users', users)
router.use('/fetch', fetch)
router.use('/promos', promos)

router.get('/*', (req, res, next) =>
  next({
    status: 404,
    message: 'Requested URI does not exist. Did you type the request correctly?'
  })
)

export default router
