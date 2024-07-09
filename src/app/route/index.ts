import { Router } from 'express';

import { bookingRouter } from '../module/booking/booking.rotes';
import { carRouter } from '../module/car/car.rotes';
import { userRouter } from '../module/user/user.rotes';

const router = Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: userRouter,
    },
    {
        path: '/cars',
        route: carRouter,
    },
    {
        path: '/bookings',
        route: bookingRouter,
    },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;