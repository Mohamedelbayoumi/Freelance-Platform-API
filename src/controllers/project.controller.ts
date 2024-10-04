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

        const { file } = req

        await this.freelacnerProjectService.createProject(
            title, description, link, freelancerId, file
        )

        res.status(200).json({ message: "Project Added Succcessfully" })
    }
}