import { Request, Response, NextFunction } from 'express'
import { ApiError } from './custom-error'


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    const statusCode = err instanceof ApiError ? err.statusCode : 500

    console.error(err)

    res.status(statusCode).json({ errorMessage: err.message })
}