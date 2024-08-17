import bcrypt from "bcrypt";
import { Response } from "express";
import { TLogin, TUser } from "./user.interface";
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

    const newUser = await User.findOne({ email: userData?.email }).select("-password");

    res.status(201).json({
        success: true,
        statusCode: 201,
        message: 'User registered successfully',
        data: newUser
    });
}
const singin = async (userData: TLogin, res: Response) => {
    const { email, password } = userData;


    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Invalid credentials'
        });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Invalid credentials'
        });
    }
    const userWithPassword = await User.findOne({ email: userData?.email }).select("-password");

    res.json({
        success: true,
        statusCode: 200,
        message: 'User logged in successfully',
        data: userWithPassword,
        token: ""
    });


}
export const userService = {
    singup, singin
}