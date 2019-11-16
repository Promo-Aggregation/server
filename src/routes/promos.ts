import { Router } from 'express'
import PromoDBController from '../controllers/promo'
import { authentication } from '../middlewares/auth'

const router = Router()

router.get('/', PromoDBController.findAll)

// * Defaults to Find All
router.get('/search', PromoDBController.search)

// * Defaults to Find All
router.get('/subscribed', authentication, PromoDBController.getBySubscriptions)

// ! Tags are required or throws an error
router.get('/tags', PromoDBController.getByTags)

export default router
