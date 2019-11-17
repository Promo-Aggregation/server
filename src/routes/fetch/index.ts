import { Router } from 'express'
import dana from './dana'

const router = Router()

router.use('/dana', dana)

export default router
