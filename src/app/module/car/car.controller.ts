import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { carService } from './car.service'

const createCar = catchAsync(async (req: Request, res: Response) => {
  const car = await carService.createCar(req.body)
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Car created successfully',
    data: car,
  })
})
const getAllCar = catchAsync(async (req: Request, res: Response) => {
  const cars = await carService.getAllCar()
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Cars retrieved successfully',
    data: cars,
  })
})
const getACar = catchAsync(async (req: Request, res: Response) => {
  await carService.getACar(req.params.id, res)
})
const updateCar = catchAsync(async (req: Request, res: Response) => {
  await carService.updateCar(req, res)
})
const deletedCar = catchAsync(async (req: Request, res: Response) => {
  await carService.deletedCar(req.params.id, res)
})
const returnCar = catchAsync(async (req: Request, res: Response) => {
  await carService.returnCar(req, res)
})

export const carController = {
  createCar,
  getAllCar,
  getACar,
  updateCar,
  deletedCar,
  returnCar,
}
