import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { userService } from './user.service'

const signup = catchAsync(async (req: Request, res: Response) => {
  await userService.singup(req?.body, res)
})
const signin = catchAsync(async (req: Request, res: Response) => {
  await userService.singin(req?.body, res)
})

export const userController = {
  signup,
  signin,
}
