import { Request } from 'express'
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { calculateTotalCost } from '../../utils/calculateTotalCost'
import { Booking } from '../booking/booking.model'
import { TCar } from './car.interface'
import { Car } from './car.model'

const createCar = async (carData: TCar) => {
  const car = await Car.create(carData)
  return car
}
const getAllCar = async () => {
  const cars = await Car.find({ isDeleted: false })
  return cars
}
const getACar = async (id: string) => {
  const car = await Car.findById(id)

  if (!car || car.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found')
  }
  return car
}
const updateCar = async (req: Request) => {
  const { id } = req.params
  const { name, description, color, isElectric, features, pricePerHour } =
    req.body

  const car = await Car.findById(id)

  if (!car || car.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found')
  }

  // Update car fields
  car.name = name || car.name
  car.description = description || car.description
  car.color = color || car.color
  car.isElectric = isElectric !== undefined ? isElectric : car.isElectric
  car.features = features || car.features
  car.pricePerHour = pricePerHour || car.pricePerHour

  const updatedCar = await car.save()
  return updatedCar
}

const deletedCar = async (id: string) => {
  const car = await Car.findById(id)

  if (!car || car.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found')
  }

  // Soft delete the car
  car.isDeleted = true
  const deletedCar = await car.save()
  return deletedCar
}
const returnCar = async (req: Request) => {
  const { bookingId, endTime } = req.body

  // Validate input
  if (!bookingId || !endTime) {
    throw new AppError(400, 'bookingId and endTime are required')
  }

  // Find the booking
  const booking = await Booking.findById(bookingId)
    .populate('user')
    .populate('car')
  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found')
  }

  // Update the car status to "available"

  // const carId = booking.car._id
  const carId = booking.car

  const car = await Car.findById(carId)
  if (car) {
    car.status = 'available'
    await car.save()
  }

  const totalCost = calculateTotalCost(
    booking.date,
    booking.startTime,
    endTime,
    // car.pricePerHour,
    car?.pricePerHour ?? 0
  )
  // function calculateTotalCost(startTime: string, endTime: string, pricePerHour: number): number {
  //   const start = new Date(`1970-01-01T${startTime}:00`);
  //   const end = new Date(`1970-01-01T${endTime}:00`);
  //   const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  //   return Math.round(hours * pricePerHour);
  // }

  // // Calculate the total cost based on startTime, endTime, and pricePerHour
  // const startTime = new Date(`${booking.date}T${booking.startTime}`)
  // const endDateTime = new Date(`${booking.date}T${endTime}`)
  // const hoursUsed =
  //   (endDateTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)

  // const totalCost = hoursUsed * car.pricePerHour

  // Update the booking with endTime and totalCost

  booking.endTime = endTime
  booking.totalCost = totalCost
  await booking.save()

  // Return the updated booking
  return booking
}
export const carService = {
  createCar,
  getAllCar,
  getACar,
  updateCar,
  deletedCar,
  returnCar,
}
