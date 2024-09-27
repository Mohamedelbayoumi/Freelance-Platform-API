import { Router } from 'express'

import { ProfileController } from '../controllers/profile.controllers'
import { checkAuthentication } from '../middlewares/auth.middleware'

const router = Router()
const profileController = new ProfileController()

router.get('/profile', checkAuthentication, profileController.show)

export default router