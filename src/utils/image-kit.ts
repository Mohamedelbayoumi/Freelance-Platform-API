import Imagekit from 'imagekit'

export const imageKit = new Imagekit({
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY as string,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY as string,
    urlEndpoint: "https://ik.imagekit.io/pdrdxybo1"
})