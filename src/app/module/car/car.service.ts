import { Request, Response } from 'express'
import { TCar } from './car.interface'
import { Car } from './car.model'
import { Booking } from '../booking/booking.model'

const createCar = async (carData: TCar) => {
  const car = await Car.create(carData)
  return car
}
const getAllCar = async () => {
  const cars = await Car.find({ isDeleted: false })
  return cars
}
const getACar = async (id: string, res: Response) => {
  const car = await Car.findById(id)

  if (!car || car.isDeleted) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'Car not found',
    })
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    data: car,
  })
}
const updateCar = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, description, color, isElectric, features, pricePerHour } =
    req.body

  const car = await Car.findById(id)

  if (!car || car.isDeleted) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'Car not found',
    })
  }

  // Update car fields
  car.name = name || car.name
  car.description = description || car.description
  car.color = color || car.color
  car.isElectric = isElectric !== undefined ? isElectric : car.isElectric
  car.features = features || car.features
  car.pricePerHour = pricePerHour || car.pricePerHour

  const updatedCar = await car.save()

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Car updated successfully',
    data: updatedCar,
  })
}

const deletedCar = async (id: string, res: Response) => {
  const car = await Car.findById(id)

  if (!car || car.isDeleted) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'Car not found',
    })
  }

  // Soft delete the car
  car.isDeleted = true
  const deletedCar = await car.save()

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Car deleted successfully',
    data: deletedCar,
  })
}
const returnCar = async (req: Request, res: Response) => {
  const { bookingId, endTime } = req.body

  // Validate input
  if (!bookingId || !endTime) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'bookingId and endTime are required',
    })
  }

  // Find the booking
  const booking = await Booking.findById(bookingId)
    .populate('user')
    .populate('car')

  if (!booking) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'Booking not found',
    })
  }

  // Calculate the total cost based on startTime, endTime, and pricePerHour
  const startTime = new Date(`${booking.date}T${booking.startTime}`)
  const endDateTime = new Date(`${booking.date}T${endTime}`)
  const hoursUsed =
    (endDateTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)

  const totalCost = hoursUsed * booking.car.pricePerHour

  // Update the booking with endTime and totalCost
  booking.endTime = endTime
  booking.totalCost = totalCost
  await booking.save()

  // Update the car status to "available"
  const car = await Car.findById(booking.car._id)
  if (car) {
    car.status = 'available'
    await car.save()
  }

  // Return the updated booking
  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Car returned successfully',
    data: booking,
  })
}
export const carService = {
  createCar,
  getAllCar,
  getACar,
  updateCar,
  deletedCar,
  returnCar,
}
