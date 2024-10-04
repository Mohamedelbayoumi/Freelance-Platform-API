import { Router } from 'express'

import { uploadMiddleware } from '../middlewares/upload.middleware'
import { checkAuthentication } from '../middlewares/auth.middleware'
import { FreelacnerProjectController } from '../controllers/project.controller'

const router = Router()
const freelacnerProjectController = new FreelacnerProjectController()

router.post('/freelancer_projects', checkAuthentication, uploadMiddleware, freelacnerProjectController.addProject)

router.get('/freelancer_projects/:projectId', freelacnerProjectController.getProject)

export default router