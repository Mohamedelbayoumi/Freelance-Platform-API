import { Express } from 'express'

import { prisma } from '../utils/prisma-client'
import { UploadService } from './upload.service'

export class FreelacnerProjectService {

    private projectModel = prisma.freelancer_Project

    private uploadService = new UploadService()

    async createProject(
        title: string, description: string, projectLink: string,
        freelancerId: number, image?: Express.Multer.File
    ) {
        let imageUrl: string | null = null

        if (image) {
            imageUrl = await this.uploadService.uploadProjectImage(image)
        }

        await this.projectModel.create({
            data: {
                title: title,
                description: description,
                link: projectLink,
                project_image: imageUrl,
                freelancer_id: freelancerId
            },
            select: {
                id: true
            }
        })
    }
}