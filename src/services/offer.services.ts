import { Prisma } from '@prisma/client'

import { prisma } from '../utils/prisma-client'
import { ApiError } from '../utils/custom-error'

export class OfferService {

    private offerModel = prisma.offer
    private taskModel = prisma.task

    private offerSelectData: Prisma.OfferSelect = {
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

    public async findAllForClientTaskOwner(taskId: number, clientId: number) {

        const task = await this.taskModel.findUnique({
            where: {
                id: taskId
            }
        })

        if (task?.client_id !== clientId) {
            const offers = await this.findAll(taskId)
            return { clientIsLogged: false, offers }
        }

        return await this.offerModel.findMany({
            where: {
                task_id: taskId
            },
            select: {
                ...this.offerSelectData,
                asking_price: true,
                implementation_duration: true
            }
        })
    }

    public async findAll(taskId: number, freelancerId?: number) {

        const offerWhereInput: Prisma.OfferWhereInput = {
            task_id: taskId
        }

        if (freelancerId) {
            offerWhereInput.freelancer_id = {
                not: freelancerId
            }
        }

        const offers = await this.offerModel.findMany({
            where: offerWhereInput,
            select: this.offerSelectData
        })

        if (!freelancerId) {
            return offers
        }

        const offer = await this.findLoggedInFreelancerOffer(taskId, freelancerId)

        return [offer, ...offers]
    }

    private async findLoggedInFreelancerOffer(taskId: number, freelancerId: number) {

        return await this.offerModel.findUnique({
            where: {
                task_id_freelancer_id: {
                    task_id: taskId,
                    freelancer_id: freelancerId
                }
            },
            select: {
                ...this.offerSelectData,
                asking_price: true,
                implementation_duration: true,
                id: true
            }
        })

    }

    public async createOfferAndUpdateTaskOfferCount(
        implementationDuration: number, askingPrice: number, taskId: number,
        description: string, freelancerId: number
    ) {
        try {
            await this.offerModel.create({
                data: {
                    description: description,
                    asking_price: askingPrice,
                    implementation_duration: implementationDuration,
                    task_id: taskId,
                    freelancer_id: freelancerId
                }
            })
            // return await prisma.$transaction(async () => {
            //     // Create Offer
            //     await this.offerModel.create({
            //         data: {
            //             description: description,
            //             asking_price: askingPrice,
            //             implementation_duration: implementationDuration,
            //             task_id: taskId,
            //             freelancer_id: freelancerId
            //         }
            //     })
            //     // Update the number of offers for the task
            //     await this.taskModel.update({
            //         where: {
            //             id: taskId
            //         },
            //         data: {
            //             no_of_offers: {
            //                 increment: 1
            //             }
            //         }
            //     })
            // })
        } catch (err) {
            if (err['code'] === 'P2002') {
                throw new ApiError(`you can not add two offers for the same project`, 403)
            }
        }
    }

    public async update(
        offerId: number, askingPrice: number,
        implementationDuration: number, description: string, freelancerId: number
    ) {
        await this.offerModel.update({
            data: {
                asking_price: askingPrice,
                implementation_duration: implementationDuration,
                description: description,
            },
            where: {
                id: offerId,
                freelancer_id: freelancerId
            }
        })
    }

    public async delete(offerId: number, freelancerId: number) {
        return await this.offerModel.delete({
            where: {
                id: offerId,
                freelancer_id: freelancerId
            }
        })
    }
}