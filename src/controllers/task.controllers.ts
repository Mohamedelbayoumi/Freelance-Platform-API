import { Request, Response } from 'express'
import { Category } from '@prisma/client'

import { TaskService } from '../services/task.services'

export class TaskController {

    private taskService: TaskService

    constructor() {
        this.taskService = new TaskService()
    }


    getTasks = async (req: Request, res: Response) => {

        const {
            page = 1,
            budget_min = 0,
            budget_max = 1000,
            duration = "",
            title,
            category
        } = req.query

        const [minDeadlineDuration, maxDeadlineDuration = 100] = duration.toString().split('-')

        const tasks = await this.taskService.findTasks(
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

    getTask = async (req: Request, res: Response) => {

        const id = + req.params.id || 0

        const task = await this.taskService.findTaskById(id)

        res.status(200).json({ task })
    }

    createTask = async (req: Request, res: Response) => {
        await this.taskService.createTask()
        res.status(201).json({ message: "task created" })
    }
}