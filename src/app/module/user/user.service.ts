import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import config from '../../config'
import AppError from '../../errors/AppError'
import { createToken } from '../../utils/auth.utils'
import { TLogin, TUser } from './user.interface'
import { User } from './user.model'

const singup = async (userData: TUser) => {
  let user = await User.findOne({ email: userData?.email })

  if (user) {
    throw new AppError(400, 'User already exists')

    // return res.status(400).json({
    //   success: false,
    //   statusCode: 400,
    //   message: 'User already exists',
    // })
  }

  // Create a new user
  user = await User.create(userData)

  const newUser = await User.findOne({ email: userData?.email }).select(
    '-password',
  )
  return newUser
  // res.status(201).json({
  //   success: true,
  //   statusCode: 201,
  //   message: 'User registered successfully',
  //   data: newUser,
  // })
}
const singin = async (userData: TLogin) => {
  const { email, password } = userData

  // Check if the user exists
  const user = await User.findOne({ email })
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid credentials')
    // return res.status(400).json({
    //   success: false,
    //   statusCode: 400,
    //   message: 'Invalid credentials',
    // })
  }

  // Check the password
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'PPassword does not match')
    // return res.status(400).json({
    //   success: false,
    //   statusCode: 400,
    //   message: 'Invalid credentials',
    // })
  }
  const userWithoutPassword = await User.findOne({
    email: userData?.email,
  }).select('-password')

  // res.json({
  //   success: true,
  //   statusCode: 200,
  //   message: 'User logged in successfully',
  //   data: userWithPassword,
  //   token: '',
  // })

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.JWT_SECRET as string,
    config.JWT_EXPIRATION_TIME as string,
  )
  return {
    accessToken,
    userWithoutPassword,
  }
}
export const userService = {
  singup,
  singin,
}
