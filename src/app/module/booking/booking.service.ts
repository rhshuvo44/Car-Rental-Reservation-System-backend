import { Request, Response } from "express";
import { Booking } from "./booking.model";

const getAllBooking = async (req: Request, res: Response) => {

    const { carId, date } = req.query;

    if (!carId || !date) {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'carId and date are required',
        });
    }

    const bookings = await Booking.find({
        car: carId,
        date: date as string,
    })
        .populate('user')
        .populate('car');

    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Bookings retrieved successfully',
        data: bookings,
    });




}
const createBooking = async (req: Request, res: Response) => {

    const { carId, date, startTime } = req.body;
    // const userId = req.user._id;
    const userId = "66c0b8fe6f96e16f0b6ffef3";

    // Validate request body
    if (!carId || !date || !startTime) {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'carId, date, and startTime are required',
        });
    }

    // Check if the car is available (not booked) at the given date and time
    const existingBooking = await Booking.findOne({ car: carId, date, startTime });
    if (existingBooking) {
        return res.status(409).json({
            success: false,
            statusCode: 409,
            message: 'Car is already booked at the selected time',
        });
    }

    // Create a new booking
    await Booking.create({
        car: carId,
        user: userId,
        date,
        startTime,
    });

    const populatedBooking = await Booking.find()
        .populate('user')
        .populate('car')
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Car booked successfully',
        data: populatedBooking,
    });


}



export const bookingService = {
    getAllBooking,
    createBooking,
    // getMyBookings
}