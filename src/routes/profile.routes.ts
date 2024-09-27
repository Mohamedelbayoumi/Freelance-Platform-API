import { Router } from 'express'

import { ProfileController } from '../controllers/profile.controllers'
import { checkAuthentication } from '../middlewares/auth.middleware'

const router = Router()
const profileController = new ProfileController()

router.get('/profile', checkAuthentication, profileController.showProfileData)

router.get('/profile/gallery', checkAuthentication, profileController.showProjectsGallery)

export default router