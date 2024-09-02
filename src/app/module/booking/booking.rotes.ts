import express from 'express'
import { bookingService } from './booking.service'
import { USER_ROLE } from '../user/user.constant'
import auth from '../../middlewares/auth'
const router = express.Router()

router.post('/', auth(USER_ROLE.user), bookingService.createBooking)
router.get('/', auth(USER_ROLE.admin), bookingService.getAllBooking)
router.get('/my-bookings', auth(USER_ROLE.user), bookingService.getMyBookings)

export const bookingRouter = router
