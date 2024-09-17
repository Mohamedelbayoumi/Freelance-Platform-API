import { Router } from 'express'

import { OfferController } from '../controllers/offer.conrollers'
import { checkAuthentication } from '../middlewares/auth.middleware'

const router = Router()

router.get('/offers', OfferController.getAll)

router.post('/offers', checkAuthentication, OfferController.create)

export default router