import { Request, Response } from 'express'

import { FreelacnerProjectService } from '../services/project.services'

export class FreelacnerProjectController {

    private freelacnerProjectService: FreelacnerProjectService

    constructor() {
        this.freelacnerProjectService = new FreelacnerProjectService()
    }

    addProject = async (req: Request, res: Response) => {

        const freelancerId = req['userId']

        const { title, description, link } = req.body

        const imagePath = req.file?.filename as string

        await this.freelacnerProjectService.createProject(
            title, description, imagePath, link, freelancerId
        )

        res.status(200).json({ message: "Project Added Succcessfully" })
    }
}