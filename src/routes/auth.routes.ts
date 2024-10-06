import { Router } from "express"

import { AuthController } from '../controllers/auth.controllers'

const router = Router()
const authController = new AuthController()

router.post('/signup', authController.signupController)

router.get('/users', authController.getUsers)

router.post('/login', authController.loginController)

export default router