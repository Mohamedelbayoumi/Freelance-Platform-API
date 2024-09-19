import { Request, Response } from 'express'

import { OfferService } from '../services/offer.services'

export class OfferController {

    private offerService: OfferService

    constructor() {
        this.offerService = new OfferService()
    }

    getAll = async (req: Request, res: Response) => {

        const freelancerId: number = req['userId']

        const taskId = Number(req.query.task_id) || 0

        const offers = await this.offerService.findAll(taskId, freelancerId)

        res.status(200).json({ offers })
    }

    create = async (req: Request, res: Response) => {

        const freelancerId: number = req['userId']

        const { implementationDuration, askingPrice, description, taskId } = req.body

        await this.offerService.create(+implementationDuration, +askingPrice, +taskId, description, freelancerId)

        res.status(201).json({ message: "Offer has been created" })
    }

    update = async (req: Request, res: Response) => {

        const offerId = req.params.offerId

        const freelancerId: number = req['userId']

        const { askingPrice, implementation_duration, description } = req.body

        await this.offerService.update(
            +offerId, +askingPrice, +implementation_duration, description, freelancerId
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