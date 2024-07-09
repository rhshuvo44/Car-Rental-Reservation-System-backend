import { ObjectId } from "mongoose";

export type TBooking = {
    date: Date;
    user: ObjectId;
    car: ObjectId;
    startTime: string;
    endTime: string;
    totalCost: number;
};