import { Router } from 'express'

import DanaFetchController from '../controllers/dana'

const router = Router()

router.get('/dana-food', DanaFetchController.danaFood)
router.get('/dana-game', DanaFetchController.danaGame)
router.get('/dana-entertainment', DanaFetchController.danaEntertainment)

export default router
