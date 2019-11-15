import { Router } from 'express'
import users from './users'

const router = Router()

router.get('/', (req, res) =>
  res.status(200).json({ message: 'Server test ok!' })
)

router.use('/users', users)

export default router
