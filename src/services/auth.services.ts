import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { prisma } from '../utils/prisma-client'
import { User } from '../types/user'
import { ApiError } from '../utils/custom-error'



export class AuthService {

    private userModel

    constructor(role: string) {
        this.userModel = role === "client" ? prisma.client : prisma.freelancer
    }

    public static async signUpUser(userData: User): Promise<void> {

        const { firstName, lastName, email, password, phoneNumber, role, country } = userData

        const userModel = role === "client" ? prisma.client : prisma.freelancer

        const user = await (userModel as any).findUnique({
            where: {
                email
            }
        })

        if (user) {
            throw new ApiError("User already exists", 409)
        }

        const hashedPassword = await hash(password, 12)

        await (userModel as any).create({
            data: {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: hashedPassword,
                phone_number: phoneNumber,
                country: country
            }
        })


        // if (role === "freelancer") {

        //     const freelancer = await prisma.freelancer.findUnique({
        //         where: {
        //             email
        //         }
        //     })

        //     if (freelancer) {
        //         throw new ApiError("User already exists", 409)
        //     }

        //     const hashedPassword = await hash(password, 12)

        //     await prisma.freelancer.create({
        //         data: {
        //             first_name: firstName,
        //             last_name: lastName,
        //             email: email,
        //             password: hashedPassword,
        //             phone_number: phoneNumber,
        //             country: country
        //         }
        //     })
        // }
        // else if (role === 'client') {

        //     const client = await prisma.client.findUnique({
        //         where: {
        //             email
        //         }
        //     })

        //     if (client) {
        //         throw new ApiError("User already exists", 401)
        //     }

        //     const hashedPassword = await hash(password, 12)

        //     await prisma.client.create({
        //         data: {
        //             first_name: firstName,
        //             last_name: lastName,
        //             phone_number: phoneNumber,
        //             email: email,
        //             password: hashedPassword,
        //             country: country
        //         }
        //     })
        // }
    }

    public static async getUsers() {
        const freelancers = await prisma.freelancer.findMany()
        const clients = await prisma.client.findMany()
        return { freelancers, clients }
    }

    public static async loginUser(role: "client" | "freelancer", email: string, password: string): Promise<string | undefined> {


        const userModel = role === "client" ? prisma.client : prisma.freelancer

        const user = await (userModel as any).findUnique({
            where: {
                email
            }
        })

        if (!user) {
            throw new ApiError("User not found", 404)
        }

        const result = await compare(password, user.password)

        if (!result) {
            throw new ApiError("Password is not correct", 401)
        }

        return sign({
            userId: user.id,
            role: role
        }, process.env.JWT_SECRET_KEY as string, { expiresIn: "2 days" })


        // if (role === 'client') {

        //     const client = await prisma.client.findUnique({
        //         where: {
        //             email
        //         }
        //     })

        //     if (!client) {
        //         throw new ApiError("User not found", 404)
        //     }

        //     const result = await compare(password, client.password)

        //     if (!result) {
        //         throw new ApiError("Password is not correct", 401)
        //     }

        //     return sign({
        //         userId: client.id,
        //         role: "client"
        //     }, process.env.JWT_SECRET_KEY as string, { expiresIn: "2 days" })

        // }

        // else if (role === 'freelancer') {
        //     const freelancer = await prisma.freelancer.findUnique({
        //         where: {
        //             email
        //         }
        //     })

        //     if (!freelancer) {
        //         throw new ApiError("User not found", 404)
        //     }

        //     const result = await compare(password, freelancer.password)

        //     if (!result) {
        //         throw new ApiError("Password is not correct", 401)
        //     }

        //     return sign({
        //         userId: freelancer.id,
        //         role: "freelancer"
        //     }, process.env.JWT_SECRET_KEY as string, { expiresIn: '2 days' })
        // }


    }
}