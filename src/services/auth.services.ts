import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { prisma } from '../utils/prisma-client'
import { User } from '../types/user'
import { ApiError } from '../utils/custom-error'



export class AuthService {

    private cleientModel = prisma.client
    private freelancerModel = prisma.freelancer

    async signUpUser(userData: User): Promise<void> {

        const { firstName, lastName, email, password, phoneNumber, role, country } = userData

        const userModel = role === "client" ? this.cleientModel : this.freelancerModel

        const user = await (userModel as any).findFirst({
            where: {
                OR: [
                    {
                        email: email
                    },
                    {
                        phone_number: phoneNumber
                    }
                ]
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
    }

    async getUsers() {
        const freelancers = await prisma.freelancer.findMany()
        const clients = await prisma.client.findMany()
        return { freelancers, clients }
    }

    async loginUser(role: "client" | "freelancer", email: string, password: string): Promise<string | undefined> {


        const userModel = role === "client" ? this.cleientModel : this.freelancerModel

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
    }
}