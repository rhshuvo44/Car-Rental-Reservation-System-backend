import { Response } from "express";
import { TCar } from "./car.interface";
import { Car } from "./car.model";

const createCar = async (carData: TCar) => {
    const car = await Car.create(carData);
    return car
}
const getAllCar = async () => {
    const cars = await Car.find({ isDeleted: false });
    return cars
}
const getACar = async (id: string, res: Response) => {
    const car = await Car.findById(id);

    if (!car || car.isDeleted) {
        return res.status(404).json({
            success: false,
            statusCode: 404,
            message: 'Car not found',
        });
    }

    res.status(200).json({
        success: true,
        statusCode: 200,
        data: car,
    });
}
export const carService = {
    createCar, getAllCar, getACar
}