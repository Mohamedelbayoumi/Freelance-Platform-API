import { prisma } from '../utils/prisma-client'

export class OfferService {
    public static async findAll(taskId: number) {
        const offers = await prisma.offer.findMany({
            where: {
                task_id: taskId
            },
            select: {
                freelancer: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        image_profile: true,
                        average_rating: true
                    }
                },
                description: true
            }
        })
        return offers
    }

    public static async create(
        implementationDuration: number, askingPrice: number, description: string,
        taskId: number, freelancerId: number
    ) {
        await prisma.offer.create({
            data: {
                description: description,
                asking_price: askingPrice,
                implementation_duration: implementationDuration,
                task_id: taskId,
                freelancer_id: freelancerId
            }
        })
    }
}