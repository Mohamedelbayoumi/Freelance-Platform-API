import { Request, Response } from 'express'
import { Category } from '@prisma/client'

import { TaskService } from '../services/task.services'

export class TaskController {

    public static async getTasks(req: Request, res: Response) {

        const {
            page = 1,
            budget_min = 0,
            budget_max = 1000,
            duration = "",
            title,
            category
        } = req.query

        const [minDeadlineDuration, maxDeadlineDuration = 100] = duration.toString().split('-')

        const tasks = await TaskService.findTasks(
            Number(page),
            Number(budget_min),
            Number(budget_max),
            Number(minDeadlineDuration),
            Number(maxDeadlineDuration),
            title as string | undefined,
            category as Category | undefined
        )

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