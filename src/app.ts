import { config } from 'dotenv'
import express from 'express'
import 'express-async-errors'
import { Request, Response, NextFunction } from 'express'

import authRoutes from './routes/auth.routes'
import taskRoutes from './routes/task.routes'
import offerroutes from './routes/offer.routes'

import { errorHandler } from './utils/global-error-handler'

config()

const port = process.env.PORT || 5000

const app = express()


app.use(express.json())

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Cookie")
    next()
})

app.use('/api/v1', authRoutes)
app.use('/api/v1', taskRoutes)
app.use('/api/v1', offerroutes)

app.use(errorHandler)


app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})
