import express from 'express'
import { bookingService } from './booking.service'
import { USER_ROLE } from '../user/user.constant'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { BookingSchemaZod } from './booking.validation'
const router = express.Router()

router.post('/', auth(USER_ROLE.user), validateRequest(BookingSchemaZod), bookingService.createBooking)
router.get('/', auth(USER_ROLE.admin), bookingService.getAllBooking)
router.get('/my-bookings', auth(USER_ROLE.user), bookingService.getMyBookings)

export const bookingRouter = router
