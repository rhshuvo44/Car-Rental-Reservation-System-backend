import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/route';
const app: Application = express();

app.use(express.json());
app.use(cors());
// application routes
app.use('/api', router);

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