import { Request, Response, NextFunction } from 'express'

import { ApiError } from '../utils/custom-error'

export const checkFreelancerRole = (req: Request, res: Response, next: NextFunction) => {

    const role = req['role']

    if (role !== 'freelancer') {
        throw new ApiError('Not Authorized User', 401)
    }

    next()
}