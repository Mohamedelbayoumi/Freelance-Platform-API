import { Router } from 'express'

import { TaskController } from '../controllers/task.controllers'

const router = Router()

router.get('/tasks', TaskController.getTasks)

router.get('/tasks/:id', TaskController.getTask)

router.post('/tasks', TaskController.createTask)

export default router