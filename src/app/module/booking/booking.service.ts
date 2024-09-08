import { Request } from 'express'
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { Booking } from './booking.model'

const getAllBooking = async (req: Request) => {
  const { carId, date } = req.query

  if (!carId || !date) {
    throw new AppError(400, 'carId and date are required')
    // return res.status(400).json({
    //   success: false,
    //   statusCode: 400,
    //   message: 'carId and date are required',
    // })
  }

  const bookings = await Booking.find({
    car: carId,
    date: date as string,
  })
    .populate('user')
    .populate('car')
  return bookings
  // return res.status(200).json({
  //   success: true,
  //   statusCode: 200,
  //   message: 'Bookings retrieved successfully',
  //   data: bookings,
  // })
}
const createBooking = async (req: Request) => {
  const { carId, date, startTime } = req.body
  const userId = req.user.userId

  // Validate request body
  if (!carId || !date || !startTime) {
    throw new AppError(400, 'carId, date, and startTime are required')
  }

  // Check if the car is available (not booked) at the given date and time
  const existingBooking = await Booking.findOne({
    car: carId, date, startTime
  })
  if (existingBooking) {
    throw new AppError(409, 'Car is already booked at the selected time')

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
    .populate('user')
    .populate('car')
  return populatedBooking
  // return res.status(200).json({
  //   success: true,
  //   statusCode: 200,
  //   message: 'Car booked successfully',
  //   data: populatedBooking,
  // })
}
const getMyBookings = async (req: Request) => {
  const userId = req.user.userId
  const bookings = await Booking.find({ user: userId })
    .populate('user')
    .populate('car')
    .sort({ date: -1, startTime: -1 })
  if (bookings.length == 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'booking data not found')
  }
  return bookings
  // return res.status(200).json({
  //   success: true,
  //   statusCode: 200,
  //   message: 'My Bookings retrieved successfully',
  //   data: bookings,
  // })
}

export const bookingService = {
  getAllBooking,
  createBooking,
  getMyBookings,
}
