import { Router } from 'express'
import dana from './dana'
import ovo from './ovo'

const router = Router()

router.use('/dana', dana)
router.use('/ovo', ovo)

export default router
