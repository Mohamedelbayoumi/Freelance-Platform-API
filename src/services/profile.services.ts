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

    //     public async findReviews(userId: number) {
    //         return await this.reviewModel.findMany({
    //             where: {
    //                 freelancer_id: userId
    //             },
    //             select: {
    //                 id: true,
    //                 review_text: true,
    //                 rating: true
    //             }
    //         })
    //     }

    //     public async findPrpjectsGallery(userId: number) {
    //         await this.projects.findMany({
    //             where: {
    //                 freelancer_id: userId
    //             },
    //             select: {

    //             }
    //         })
    //     }
}