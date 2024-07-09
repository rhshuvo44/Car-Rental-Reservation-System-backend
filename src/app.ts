import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { userRouter } from './app/module/user/user.rotes';
import { carRouter } from './app/module/car/car.rotes';
import { bookingRouter } from './app/module/booking/booking.rotes';
const app: Application = express();

app.use(express.json());
app.use(cors());
// app route
app.use('/api/auth', userRouter);
app.use('/api/cars', carRouter);
app.use('/api/bookings', bookingRouter);

// root route
app.get('/', (req: Request, res: Response) => {
    res.send('Assignment 3 Car Rental Reservation System Backend Server');
});
// Not Found Route Handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});
export default app;