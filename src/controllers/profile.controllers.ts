import { Request, Response } from 'express'
import { ProfileService } from '../services/profile.services'

export class ProfileController {
    private profileService: ProfileService
    constructor() {
        this.profileService = new ProfileService()
    }

    showProfileData = async (req: Request, res: Response) => {

        const userId = req['userId']

        const profileData = await this.profileService.findUserProfileData(userId)

        res.status(200).json({ profileData })
    }

    showProjectsGallery = async (req: Request, res: Response) => {

        const userId = req['userId']

        const projectsGallertData = await this.profileService.findProjectsGallery(userId)

        res.status(200).json({ projectsGallertData })
    }

    showReviews = async (req: Request, res: Response) => {

        const freelancerId = req['userId']

        const reviews = await this.profileService.findReviews(freelancerId)

        res.status(200).json({ reviews })
    }

    editProfileData = async (req: Request, res: Response) => {

        const freelancerId = req['userId']

        const bio: string = req.body.bio

        const skills: string[] = req.body.skills

        await this.profileService.updateFreelancerProfile(freelancerId, bio, skills)

        res.status(200).json({ message: "Profile Data Changed" })
    }
}