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
    data: result,
  })
})

const signin = catchAsync(async (req: Request, res: Response) => {
  const { userWithoutPassword, accessToken } = await userService.singin(
    req?.body,
  )

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
