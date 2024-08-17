import { Response } from "express";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const singup = async (userData: TUser, res: Response) => {
    let user = await User.findOne({ email: userData?.email });

    if (user) {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'User already exists'
        });
    }

    // Create a new user
    user = await User.create(userData);


    res.status(201).json({
        success: true,
        statusCode: 201,
        message: 'User registered successfully',
        data: user
    });
}
export const userService = {
    singup
}