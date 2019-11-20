import { Router } from 'express'

import UserController from '../controllers/user'
import SubscriptionController from '../controllers/subscription'

const router = Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.put('/subscribe', SubscriptionController.subscribe)
router.put('/unsubscribe', SubscriptionController.unsubscribe)

export default router
