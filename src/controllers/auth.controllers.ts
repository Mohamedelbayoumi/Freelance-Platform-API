import { Request, Response } from "express"

import { AuthService } from '../services/auth.services'


export const signupController = async (req: Request, res: Response) => {

    new AuthService(req.body.role)

    await AuthService.signUpUser(req.body)

    res.status(201).json({ message: "User has been created" })
}

export const loginController = async (req: Request, res: Response) => {

    const { email, password, role } = req.body

    const token = await AuthService.loginUser(role, email, password)

    res.status(200).json({ token: token, message: "User loggedin successfully" })
}

export const getUsers = async (req: Request, res: Response) => {

    const users = await AuthService.getUsers()

    res.status(200).json({ data: users })
}