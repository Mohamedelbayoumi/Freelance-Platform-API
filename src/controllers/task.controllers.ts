import { Request, Response } from 'express'
import { Category } from '@prisma/client'

import { TaskService } from '../services/task.services'

export class TaskController {

    public static async getTasks(req: Request, res: Response) {

        const budget_min = Number(req.query.budget_min) || 0

        const budget_max = Number(req.query.budget_max) || 1000

        const page = Number(req.query.page) || 1

        const category = req.query.category as Category | undefined

        const title = req.query.title as string | undefined

        const duration = req.query.duration as string | undefined || ""

        const deadlineDuration = duration.split('-')

        const minDeadlineDuration = Number(deadlineDuration[0])

        const maxDeadlineDuration = Number(deadlineDuration[1]) || 100

        const tasks = await TaskService.findTasks(
            page, budget_min, budget_max, minDeadlineDuration, maxDeadlineDuration, title, category)

        res.status(200).json({ tasks })

    }

    public static async getTask(req: Request, res: Response) {

        const id = + req.params.id || 0

        const task = await TaskService.findTaskById(id)

        res.status(200).json({ task })
    }

    public static async createTask(req: Request, res: Response) {
        await TaskService.createTask()
        res.status(201).json({ message: "task created" })
    }
}