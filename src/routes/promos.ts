import { Router } from 'express'

import DanaController from '../controllers/dana'

const router = Router()

router.get('/dana-food', DanaController.danaFood)
router.get('/dana-game', DanaController.danaGame)
router.get('/dana-entertainment', DanaController.danaEntermainment)

export default router
