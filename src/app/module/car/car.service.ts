import { TCar } from "./car.interface";
import { Car } from "./car.model";

const createCar = async (carData: TCar) => {


    const car = await Car.create(carData);

    return car
}

export const carService = {
    createCar
}