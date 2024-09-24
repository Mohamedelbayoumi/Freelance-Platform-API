import { Request, Response } from 'express'

import { OfferService } from '../services/offer.services'

export class OfferController {

    private offerService: OfferService

    constructor() {
        this.offerService = new OfferService()
    }

    getAll = async (req: Request, res: Response) => {

        const userId: number = req['userId']

        const role: string = req['role']

        const taskId = Number(req.query.task_id) || 0

        if (role === 'client') {
            const offersResult = await this.offerService.findAllForClientTaskOwner(taskId, userId)

            if (offersResult['clientIsLogged'] === false) {
                return res.status(200).json({ offers: offersResult['offers'] })
            }
            res.status(200).json({ role: "Authenticated Client", offers: offersResult })
        }
        else {
            const offers = await this.offerService.findAll(taskId, userId)
            res.status(200).json({ offers })
        }
    }

    create = async (req: Request, res: Response) => {

        const freelancerId: number = req['userId']

        const { implementationDuration, askingPrice, description, taskId } = req.body

        await this.offerService.createOfferAndUpdateTaskOfferCount(
            +implementationDuration, +askingPrice, +taskId, description, freelancerId
        )

        res.status(201).json({ message: "Offer has been created" })
    }

    update = async (req: Request, res: Response) => {

        const offerId = req.params.offerId

        const freelancerId: number = req['userId']

        const { askingPrice, implementationDuration, description } = req.body

        await this.offerService.update(
            +offerId, +askingPrice, +implementationDuration, description, freelancerId
        )

        res.status(204).json()
    }

    delete = async (req: Request, res: Response) => {

        const offerId = req.params.offerId

        const freelancerId: number = req['userId']

        await this.offerService.delete(+offerId, freelancerId)

        res.status(204).json()
    }
} 