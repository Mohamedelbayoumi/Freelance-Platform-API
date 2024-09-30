import { prisma } from '../utils/prisma-client'

export class FreelacnerProjectService {

    private projectModel = prisma.freelancer_Project

    async createProject(
        title: string, description: string, imagePath: string,
        projectLink: string, freelancerId: number
    ) {
        return await this.projectModel.create({
            data: {
                title: title,
                description: description,
                link: projectLink,
                project_images: {
                    create: {
                        project_image: imagePath
                    }
                },
                freelancer_id: freelancerId
            },
            select: {
                id: true
            }
        })
    }
}