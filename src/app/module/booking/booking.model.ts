import { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const BookingSchema = new Schema<TBooking>({
    date: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    totalCost: { type: Number, default: 0 },
}, {
    timestamps: true
});

export const Booking = model<TBooking>('Booking', BookingSchema);