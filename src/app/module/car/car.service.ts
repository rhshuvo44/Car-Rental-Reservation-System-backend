import { Request } from 'express'
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
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
  // res.status(200).json({
  //   success: true,
  //   statusCode: 200,
  //   data: car,
  // })
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
  // const id=req.params.id
  const { bookingId, endTime } = req.body

  // Validate input
  if (!bookingId || !endTime) {
    throw new AppError(400, 'bookingId and endTime are required')
  }

  // Find the booking
  const booking = await Booking.findById({ _id: bookingId })
    .populate({
      path: 'user',
      select: '-password',
    })
    .populate('car')
  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found')
  }
  const car = await Car.findOne({ _id: booking.car })
  const pricePerHour = car?.pricePerHour

  // Calculate the total cost based on startTime, endTime, and pricePerHour
  const startTime = new Date(`${booking.date}T${booking.startTime}`)
  const endDateTime = new Date(`${booking.date}T${endTime}`)
  const hoursUsed =
    (endDateTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)
  if (pricePerHour) {
    const totalCost = hoursUsed * pricePerHour

    // Update the booking with endTime and totalCost

    booking.endTime = endTime
    booking.totalCost = totalCost
    await booking.save()
  }


  // Update the car status to "available"


  if (car) {
    car.status = 'available'
    await car.save()
  }

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
