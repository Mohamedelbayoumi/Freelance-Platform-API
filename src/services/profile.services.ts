import { prisma } from '../utils/prisma-client'

export class ProfileService {
    private freelancerModel = prisma.freelancer
    private reviewModel = prisma.freelancer_Review
    private projectsModel = prisma.freelancer_Project

    public async findUserProfileData(freelancerId: number) {
        return await this.freelancerModel.findUnique({
            where: {
                id: freelancerId
            },
            select: {
                first_name: true,
                last_name: true,
                bio: true,
                average_rating: true,
                image_profile: true,
                skills: true
            }
        })
    }

    public async findReviews(freelancerId: number) {
        return await this.reviewModel.findMany({
            where: {
                freelancer_id: freelancerId
            },
            select: {
                id: true,
                review_text: true,
                rating: true
            }
        })
    }

    public async findProjectsGallery(freelancerId: number) {
        return await this.projectsModel.findMany({
            where: {
                freelancer_id: freelancerId
            },
            select: {
                id: true,
                title: true,
                no_of_views: true,
                project_image: true
            }
        })
    }

    public async updateFreelancerProfile(freelancerId: number, bio: string, skills: string[]) {
        return await this.freelancerModel.update({
            data: {
                bio: bio,
                skills: skills
            },
            where: {
                id: freelancerId
            },
            select: {
                id: true
            }
        })
    }
}