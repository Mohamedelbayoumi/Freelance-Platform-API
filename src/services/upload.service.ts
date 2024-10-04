import { Express } from 'express'

import { imageKit } from '../utils/image-kit'

export class UploadService {

    async uploadProjectImage(file: Express.Multer.File): Promise<string> {

        const [imageName, extName] = file.originalname.split('.')

        const respone = await imageKit.upload({
            file: file.buffer,
            folder: "project-images",
            fileName: imageName + "-" + Date.now() + "-" + extName
        })

        return respone.url
    }
}
