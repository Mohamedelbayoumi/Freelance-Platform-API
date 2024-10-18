import { Request, Response } from "express"

import { AuthService } from '../services/auth.services'

export class AuthController {

    private authService: AuthService

    constructor() {
        this.authService = new AuthService()
    }

    signupController = async (req: Request, res: Response) => {

        await this.authService.signUpUser(req.body)

        res.status(201).json({ message: "User has been created" })
    }

    loginController = async (req: Request, res: Response) => {

        const { email, password, role } = req.body

        const token = await this.authService.loginUser(role, email, password)

        res.status(200).json({ token: token, message: "User loggedin successfully", role })
    }

    getUsers = async (req: Request, res: Response) => {

        const users = await this.authService.getUsers()

        res.status(200).json({ data: users })
    }

}


