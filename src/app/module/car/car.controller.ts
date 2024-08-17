import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { carService } from "./car.service";

const createCar = catchAsync(async (req: Request, res: Response) => {
    const car = await carService.createCar(req.body)
    res.status(201).json({
        success: true,
        statusCode: 201,
        message: 'Car created successfully',
        data: car,
    })
})



export const carController = {
    createCar
}