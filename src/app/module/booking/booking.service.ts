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
        .populate('user', 'name email role phone address')
        .populate('car', 'name description color isElectric features pricePerHour status isDeleted createdAt updatedAt');

    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Bookings retrieved successfully',
        data: bookings,
    });




}



export const bookingService = {
    getAllBooking,
    // createBooking,
    // getMyBookings
}