import { Request, Response } from 'express'
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import sendResponse from '../../utils/sendResponse'
import { Booking } from './booking.model'

const getAllBooking = async (req: Request) => {
  const { carId, date } = req.query

  if (!carId || !date) {
    throw new AppError(400, 'carId and date are required')

  }

  const bookings = await Booking.find({
    car: carId,
    date: date as string,
  })
    .populate('user')
    .populate('car')
  return bookings

}
const createBooking = async (req: Request, res: Response) => {
  const { carId, date, startTime } = req.body
  const userId = req.user.userId

  // Validate request body
  if (!carId || !date || !startTime) {
    // throw new AppError(400, 'carId, date, and startTime are required')
    res.status(400).json({
      statusCode: 400,
      success: false,
      message: 'carId, date, and startTime are required',
    })
  }

  // Check if the car is available (not booked) at the given date and time
  const existingBooking = await Booking.findOne({
    car: carId, date, startTime
  })
  if (existingBooking) {

    res.status(409).json({
      statusCode: 409,
      success: false,
      message: 'Car is already booked at the selected time',
    })



  }

  // Create a new booking
  await Booking.create({
    car: carId,
    user: userId,
    date,
    startTime,
  })

  const populatedBooking = await Booking.find({
    car: carId,
  })
    .populate({
      path: 'user',
      select: '-password',
    }
    )
    .populate('car')
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car booked successfully',
    data: populatedBooking,
  })

  return populatedBooking

}
const getMyBookings = async (req: Request, res: Response) => {
  const userId = req.user.userId
  const bookings = await Booking.find({ user: userId })
    .populate({
      path: 'user',
      select: '-password',
    })
    .populate('car')
    .sort({ date: -1, startTime: -1 })
  if (bookings.length == 0) {
    res.status(httpStatus.NOT_FOUND).json({
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'booking data not found',
    })
    // throw new AppError(httpStatus.NOT_FOUND, 'booking data not found')
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Bookings retrieved successfully',
    data: bookings,

  })
  // return bookings

}

export const bookingService = {
  getAllBooking,
  createBooking,
  getMyBookings,
}
