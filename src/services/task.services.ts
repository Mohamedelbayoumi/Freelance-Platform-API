import { Category } from '@prisma/client'

import { Task } from '../types/task'
import { prisma } from '../utils/prisma-client'

export class TaskService {

    // private taskModel: Prisma.TaskDelegate<DefaultArgs> = prisma.task

    private taskModel = prisma.task

    public static async createTask() {

        // const { title, description, category, duration, minPrice, maxPrice } = taskData

        // await prisma.task.create({
        //     data: {
        //         title: "protofilo website",
        //         description: "you should create a website that represent the most important projects for some person",
        //         category: 'Frontend_Development',
        //         min_price: 200,
        //         max_price: 220,
        //         client_id: 1,
        //         deadline_duration: 4
        //     }
        // })

        console.log("created")
    }

    public static async findTasks(
        page: number, budget_min: number, budget_max: number,
        minDeadlineDuration: number, maxDeadlineDuration: number,
        title?: string, category?: Category
    ) {
        const tasks = await prisma.task.findMany({
            skip: (page - 1) * 20,
            take: 20,
            where: {
                category: category,
                title: {
                    contains: title
                },
                OR: [
                    {
                        min_price: {
                            gte: budget_min,
                            lte: budget_max
                        }
                    },
                    {
                        max_price: {
                            gte: budget_min,
                            lte: budget_max
                        }
                    }
                ],
                deadline_duration: {
                    gte: minDeadlineDuration,
                    lt: maxDeadlineDuration
                }
            },
            select: {
                id: true,
                title: true,
                description: true,
                created_at: true,
                is_opened: true,
                no_of_offers: true,
                keywords: true,
                client: {
                    select: {
                        first_name: true,
                        last_name: true
                    }
                }
            }
        })

        return tasks
    }

    public static async findTaskById(id: number) {
        return await prisma.task.findUnique({
            where: {
                id
            },
            select: {
                title: true,
                is_opened: true,
                no_of_offers: true,
                created_at: true,
                min_price: true,
                max_price: true,
                category: true,
                keywords: true,
                description: true,
                deadline_duration: true,
                client: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true
                    }
                }
            }
        })
    }

    public static async findByFullText() {

    }
}