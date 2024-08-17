import { model, Schema } from 'mongoose'
import { TCar } from './car.interface'

const CarSchema = new Schema<TCar>(
  {
    name: { type: String, required: true },
    description: { type: String },
    color: { type: String, required: true },
    isElectric: { type: Boolean, required: true },
    status: {
      type: String,
      enum: ['available', 'unavailable'],
      default: 'available',
    },
    features: { type: [String] },
    pricePerHour: { type: Number, required: true, min: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)

export const Car = model<TCar>('Car', CarSchema)
