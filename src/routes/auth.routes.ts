import { Router } from "express"

import { signupController, getUsers, loginController } from '../controllers/auth.controllers'

const router = Router()

router.post('/signup', signupController)

router.get('/users', getUsers)

router.post('/login', loginController)

export default router