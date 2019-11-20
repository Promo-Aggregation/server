import { Router } from 'express'
import SubscriptionController from '../controllers/subscription'
import { authentication } from '../middlewares/auth'

const router = Router()

router.put('/subscribe', authentication, SubscriptionController.subscribe)
router.put('/unsubscribe', authentication, SubscriptionController.unsubscribe)

export default router
