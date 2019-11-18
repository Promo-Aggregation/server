import { Router } from 'express'
import users from './users'
import fetch from './fetch'
import promos from './promos'
import subscribe from './subscribe'
import { Request, Response, NextFunction } from 'express'
import Redis from 'ioredis'

const redis = new Redis()

const router = Router()

router.get('/', (req, res) => res.status(200).json({ message: 'Server test ok!' }))

router.use('/users', users)
router.use('/fetch', fetch)
router.use('/promos', promos)
router.use('/subscriptions', subscribe)

router.get('/cache/clear', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await redis.flushall()
    res.status(200).send({ message: 'Cache cleared' })
  } catch (e) {
    next(e)
  }
})

router.get('/*', (req, res, next) =>
  next({
    status: 404,
    message: 'Requested URI does not exist. Did you type the request correctly?'
  })
)

export default router
