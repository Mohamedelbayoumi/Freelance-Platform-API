import { Request, Response } from 'express'

import { OfferService } from '../services/offer.services'

export class OfferController {
    public static async getAll(req: Request, res: Response) {

        const taskId = Number(req.query.task_id) || 0

        const offers = await OfferService.findAll(taskId)

        res.status(200).json({ offers })
    }

    public static async create(req: Request, res: Response) {
        const freelancerId = 1
        // const freelancerId = req.userId 
        const { implementationDuration, askingPrice, description, taskId } = req.body

        await OfferService.create(implementationDuration, askingPrice, description, taskId, freelancerId)

        res.status(201).json({ message: "Offer has been created" })
    }
} 