import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { userService } from './user.service'

const signup = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.singup(req?.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: {
      result,
    },
  })
})

const signin = catchAsync(async (req: Request, res: Response) => {
  const { userWithoutPassword, accessToken } = await userService.singin(
    req?.body,
  )
  //  res.cookie('refreshToken', refreshToken, {
  //     secure: config.NODE_ENV === 'production',
  //     httpOnly: true,
  //     sameSite: 'none',
  //     maxAge: 1000 * 60 * 60 * 24 * 365,
  //   });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in succesfully!',
    data: userWithoutPassword,
    token: accessToken,
  })
})

export const userController = {
  signup,
  signin,
}
