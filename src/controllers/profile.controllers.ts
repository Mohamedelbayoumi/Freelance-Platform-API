import { Request, Response, NextFunction } from 'express'
import { ProfileService } from '../services/profile.services'

export class ProfileController {
    private profileService: ProfileService
    constructor() {
        this.profileService = new ProfileService()
    }

    showProfileData = async (req: Request, res: Response, next: NextFunction) => {

        const userId = req['userId']

        const profileData = await this.profileService.findUserProfileData(userId)

        res.status(200).json({ profileData })
    }

    showProjectsGallery = async (req: Request, res: Response, next: NextFunction) => {

        const userId = req['userId']

        const projectsGallertData = await this.profileService.findPrpjectsGallery(userId)

        res.status(200).json({ projectsGallertData })
    }
}