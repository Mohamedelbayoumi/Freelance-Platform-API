import { prisma } from '../utils/prisma-client'

export class ProfileService {
    private freelancerModel = prisma.freelancer
    private reviewModel = prisma.freelancer_Review
    private projects = prisma.freelancer_Project

    public async findUserProfileData(userId: number) {
        return await this.freelancerModel.findUnique({
            where: {
                id: userId
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

    public async findReviews(userId: number) {
        return await this.reviewModel.findMany({
            where: {
                freelancer_id: userId
            },
            select: {
                id: true,
                review_text: true,
                rating: true
            }
        })
    }

    public async findPrpjectsGallery(userId: number) {
        return await this.projects.findMany({
            where: {
                freelancer_id: userId
            },
            select: {
                id: true,
                title: true,
                no_of_views: true,
                project_images: {
                    take: 1,
                    select: {
                        project_image: true
                    }
                }
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