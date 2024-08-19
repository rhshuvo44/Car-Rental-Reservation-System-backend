import express from 'express'
import { bookingService } from './booking.service'
const router = express.Router()

router.post('/', bookingService.createBooking)
router.get('/', bookingService.getAllBooking)
router.get('/my-bookings', bookingService.getMyBookings)

export const bookingRouter = router
