import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
// create user model 
const UserSchema = new Schema<TUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ['user', 'admin'] },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
}, {
    timestamps: true
});

export const User = model<TUser>('User', UserSchema);
