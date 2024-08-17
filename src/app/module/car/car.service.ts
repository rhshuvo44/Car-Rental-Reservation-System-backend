import { Request, Response } from 'express'
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
    const { id } = req.params;
    const { name, description, color, isElectric, features, pricePerHour } = req.body;

    const car = await Car.findById(id);

    if (!car || car.isDeleted) {
        return res.status(404).json({
            success: false,
            statusCode: 404,
            message: 'Car not found',
        });
    }

    // Update car fields
    car.name = name || car.name;
    car.description = description || car.description;
    car.color = color || car.color;
    car.isElectric = isElectric !== undefined ? isElectric : car.isElectric;
    car.features = features || car.features;
    car.pricePerHour = pricePerHour || car.pricePerHour;

    const updatedCar = await car.save();

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Car updated successfully',
        data: updatedCar,
    });
}

const deletedCar = async (id: string, res: Response) => {


    const car = await Car.findById(id);

    if (!car || car.isDeleted) {
        return res.status(404).json({
            success: false,
            statusCode: 404,
            message: 'Car not found',
        });
    }

    // Soft delete the car
    car.isDeleted = true;
    const deletedCar = await car.save();

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Car deleted successfully',
        data: deletedCar,
    });
}
export const carService = {
    createCar,
    getAllCar,
    getACar,
    updateCar, deletedCar
}
