import multer from 'multer'
import { diskStorage, FileFilterCallback } from 'multer'
import { Request, Express } from 'express'

import { ApiError } from '../utils/custom-error'

const storage = diskStorage({
    destination(req, file, callback) {
        callback(null, "public/projects images")
    },
    filename(req, file, callback) {
        const [imageName, extName] = file.originalname.split('.')
        callback(null, imageName + "-" + Date.now() + "." + extName)
    }
})

const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
    if (file.mimetype === 'image/png' || file.mimetype === "image/jpeg") {
        callback(null, true)
    }
    else {
        callback(new ApiError("Please upload image with mimetype image/png or image/jpeg", 415))
    }
}

export const uploadMiddleware = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 52428800 } // max file size = 50 mb
}).single('image')