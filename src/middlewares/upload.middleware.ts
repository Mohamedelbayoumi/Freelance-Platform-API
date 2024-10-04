import multer from 'multer'
import { memoryStorage, FileFilterCallback } from 'multer'
import { Request, Express } from 'express'

import { ApiError } from '../utils/custom-error'

const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
    if (file.mimetype === 'image/png' || file.mimetype === "image/jpeg") {
        callback(null, true)
    }
    else {
        callback(new ApiError("Please upload image with mimetype image/png or image/jpeg", 415))
    }
}

export const uploadMiddleware = multer({
    storage: memoryStorage(),
    fileFilter: fileFilter,
    limits: { fileSize: 52428800 } // max file size = 50 mb
}).single('image')