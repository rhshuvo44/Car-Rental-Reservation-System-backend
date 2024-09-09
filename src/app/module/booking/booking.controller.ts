import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { bookingService } from './booking.service'

const getAllBooking = catchAsync(async (req: Request, res: Response) => {
  const bookings = await bookingService.getAllBooking(req)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data:
      bookings,

  })
})
const createBooking = catchAsync(async (req: Request, res: Response) => {
   await bookingService.createBooking(req,res)
  
})
const getMyBookings = catchAsync(async (req: Request, res: Response) => {
  const myBookings = await bookingService.getMyBookings(req)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Bookings retrieved successfully',
    data:
      myBookings,

  })
})

export const bookingController = {
  getAllBooking,
  createBooking,
  getMyBookings,
}
