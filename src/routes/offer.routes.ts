import { Router } from 'express'

import { OfferController } from '../controllers/offer.conrollers'
import { checkAuthentication } from '../middlewares/auth.middleware'

const router = Router()

const offerController = new OfferController()

router.get('/offers', offerController.getAll)

router.post('/offers', checkAuthentication, offerController.create)

router.patch('/offers/:id', checkAuthentication)

router.delete('/offers/:id', checkAuthentication)

export default router