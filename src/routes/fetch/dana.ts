import { Router } from 'express'

import DanaFetchController from '../../controllers/dana'

const router = Router()

router.get('/food', DanaFetchController.danaFood)
router.get('/game', DanaFetchController.danaGame)
router.get('/entertainment', DanaFetchController.danaEntertainment)

export default router
