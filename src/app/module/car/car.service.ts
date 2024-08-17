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

export const carService = {
    createCar, getAllCar
}