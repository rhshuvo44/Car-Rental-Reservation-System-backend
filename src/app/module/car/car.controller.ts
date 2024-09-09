import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { carService } from './car.service'

const createCar = catchAsync(async (req: Request, res: Response) => {
  const car = await carService.createCar(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car created successfully',
    data: car,
  })
  // res.status(201).json({
  //   success: true,
  //   statusCode: 201,
  //   message: 'Car created successfully',
  //   data: car,
  // })
})
const getAllCar = catchAsync(async (req: Request, res: Response) => {
  const cars = await carService.getAllCar()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cars retrieved successfully',
    data: cars,
  })
  // res.status(200).json({
  //   success: true,
  //   statusCode: 200,
  //   message: 'Cars retrieved successfully',
  //   data: cars,
  // })
})
const getACar = catchAsync(async (req: Request, res: Response) => {
  const car = await carService.getACar(req.params.id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A Car retrieved successfully',
    data: car,
  })
})
const updateCar = catchAsync(async (req: Request, res: Response) => {
  const updatedCar = await carService.updateCar(req)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car updated successfully',
    data: updatedCar,
  })
})
const deletedCar = catchAsync(async (req: Request, res: Response) => {
  const deleteCar = await carService.deletedCar(req.params.id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car deleted successfully',
    data: deleteCar,
  })
})
const returnCar = catchAsync(async (req: Request, res: Response) => {
  const carReturn = await carService.returnCar(req)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car returned successfully',
    data: carReturn,
  })
})

export const carController = {
  createCar,
  getAllCar,
  getACar,
  updateCar,
  deletedCar,
  returnCar,
}
