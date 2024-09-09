import { ObjectId } from 'mongoose'

export type TBooking = {
  date: string
  user: ObjectId
  car: ObjectId
  startTime: string
  endTime?: string
  totalCost: number
}
