import { Router } from 'express'

import OvoController from '../../controllers/ovo'
import OvoFetchDB from '../../controllers/ovoDB'

const router = Router()

router.get('/food', OvoController.ovoFood)
router.get('/update', OvoFetchDB.update)

export default router
