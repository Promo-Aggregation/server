import { User, IUserModel } from '../models'
import { Request, Response, NextFunction } from 'express'

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
  const { device_token } = req.headers
  if (!device_token) return next({ status: 400, message: 'Please set device token' })
  const user: IUserModel = await User.findOne({ device_token })
  if (user) {
    req.device_token = device_token
    req.subscription = user.subscription
    next()
  } else {
    next({ status: 401, message: 'Device is not registered on the server.' })
  }
}
