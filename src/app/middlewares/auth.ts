import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import AppError from '../errors/AppError'
import { TUserRole } from '../module/user/user.interface'
import { User } from '../module/user/user.model'
import catchAsync from '../utils/catchAsync'

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
    }

    // checking if the given token is valid
    const decoded = jwt.verify(token, config.JWT_SECRET as string) as JwtPayload

    const { role, userId } = decoded

    // checking if the user is exist
    const user = await User.findById(userId)

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized  hi!')
    }

    req.user = decoded as JwtPayload & { role: string }
    next()
  })
}

export default auth
