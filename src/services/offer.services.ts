import { Prisma } from '@prisma/client'

import { prisma } from '../utils/prisma-client'

export class OfferService {

    private offerModel = prisma.offer

    public async findAll(taskId: number, freelancerId: number) {
        const offers = await this.offerModel.findMany({
            where: {
                task_id: taskId,
                freelancer_id: {
                    not: freelancerId
                }
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
                id: true,
                description: true
            }
        })
        let offer = await this.findLoggedInFreelancerOffer(taskId, freelancerId)

        if (offer) {
            offer['userLoggedin'] = true
        }

        return [offer, offers]
    }

    private async findLoggedInFreelancerOffer(taskId: number, freelancerId: number) {
        return await this.offerModel.findUnique({
            where: {
                task_id_freelancer_id: {
                    task_id: taskId,
                    freelancer_id: freelancerId
                }
            }
        })

    }

    public async create(
        implementationDuration: number, askingPrice: number, taskId: number,
        description: string, freelancerId: number
    ) {
        await this.offerModel.create({
            data: {
                description: description,
                asking_price: askingPrice,
                implementation_duration: implementationDuration,
                task_id: taskId,
                freelancer_id: freelancerId
            }
        })
    }

    public async update(
        offerId: number, askingPrice?: number, implementationDuration?: number,
        description?: string
    ) {

        const data: Prisma.OfferUpdateInput = {
            asking_price: askingPrice
        }

        await this.offerModel.update({
            data: {
                asking_price: askingPrice,
                implementation_duration: implementationDuration,
                description: description,
            },
            where: {
                id: offerId
            }
        })
    }

    public async delete(offerId: number) {
        return await this.offerModel.delete({
            where: {
                id: offerId
            }
        })
    }
}