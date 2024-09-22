import { Router } from 'express'

import { OfferController } from '../controllers/offer.conrollers'
import { checkAuthentication } from '../middlewares/auth.middleware'
import { checkFreelancerRole } from '../middlewares/roles.middleware'

const router = Router()

const offerController = new OfferController()

router.get('/offers', checkAuthentication, offerController.getAll)

router.post('/offers', checkAuthentication, checkFreelancerRole, offerController.create)

router.put('/offers/:offerId', checkAuthentication, checkFreelancerRole, offerController.update)

router.delete('/offers/:offerId', checkAuthentication, checkFreelancerRole, offerController.delete)

export default router