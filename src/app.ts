import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import router from './app/route'
import cookieParser from 'cookie-parser'
import notFound from './app/middlewares/notFound'
import globalErrorHandler from './app/middlewares/globalErrorhandler'
const app: Application = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

// application routes
app.use('/api', router)

// root route
app.get('/', (req: Request, res: Response) => {
  res.send('Assignment 3 Car Rental Reservation System Backend Server')
})
//Not Found
app.use(notFound)

app.use(globalErrorHandler)
export default app
