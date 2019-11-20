import { Router } from 'express'

import DanaFetchController from '../../controllers/dana'
import DanaFetchDB from '../../controllers/danaDB'

const router = Router()

router.get('/food', DanaFetchController.danaFood)
router.get('/game', DanaFetchController.danaGame)
router.get('/entertainment', DanaFetchController.danaEntertainment)
router.get('/update', DanaFetchDB.update)

export default router
