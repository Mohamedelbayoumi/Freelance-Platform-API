import { Router } from 'express'

import { TaskController } from '../controllers/task.controllers'
import { checkAuthentication } from '../middlewares/auth.middleware'

const router = Router()
const taskController = new TaskController()

router.get('/tasks', taskController.getTasks)

router.get('/tasks/:id', taskController.getTask)

router.post('/tasks', checkAuthentication, taskController.createTask)

export default router