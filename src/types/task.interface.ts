import { Category } from '@prisma/client'

export interface Task {
    title: string
    description: string
    minPrice: number
    maxPrice: number
    duration: number
    category: Category,
    keywords: string[]
}