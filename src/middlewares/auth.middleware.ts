import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import { ExtendedPayload } from '../types/jwt-payload'
import { ApiError } from '../utils/custom-error'


export const checkAuthentication = (req: Request, res: Response, next: NextFunction) => {
    const [type, token] = req.headers.authorization?.split(' ') || []

    const extractedToken = type === 'Bearer' ? token : undefined

    if (!extractedToken) {

        if (req.method === "GET") {
            return next()
        }

        throw new ApiError("No token found", 404)
    }

    const decodedToken = verify(extractedToken, process.env.JWT_SECRET_KEY as string) as ExtendedPayload

    req['userId'] = decodedToken.userId

    req['role'] = decodedToken.role

    next()
}