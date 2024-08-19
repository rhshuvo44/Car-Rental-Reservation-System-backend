import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { bookingService } from "./booking.service"

const getAllBooking = catchAsync(async (req: Request, res: Response) => {
    await bookingService.getAllBooking(req, res)
})
const createBooking = catchAsync(async (req: Request, res: Response) => {
    await bookingService.createBooking(req, res)
})
const getMyBookings = catchAsync(async (req: Request, res: Response) => {
    await bookingService.createBooking(req, res)
})


export const bookingController = {
    getAllBooking,
    createBooking,
    getMyBookings
}