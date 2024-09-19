import { Router } from 'express'

import { OfferController } from '../controllers/offer.conrollers'
import { checkAuthentication } from '../middlewares/auth.middleware'

const router = Router()

const offerController = new OfferController()

router.get('/offers', checkAuthentication, offerController.getAll)

router.post('/offers', checkAuthentication, offerController.create)

router.put('/offers/:offerId', checkAuthentication, offerController.update)

router.delete('/offers/:offerId', checkAuthentication, offerController.delete)

export default router