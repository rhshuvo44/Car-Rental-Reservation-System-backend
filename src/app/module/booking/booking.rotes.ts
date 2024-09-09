import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { bookingController } from './booking.controller'
import { BookingSchemaZod } from './booking.validation'
const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BookingSchemaZod),
  bookingController.createBooking,
)
router.get('/', auth(USER_ROLE.admin), bookingController.getAllBooking)
router.get('/my-bookings', auth(USER_ROLE.user), bookingController.getMyBookings)

export const bookingRouter = router
