import User, { IUserModel } from '../models/user'

class UserController {
  static async register(req: any, res: any, next: Function) {
    try {
      const { device_token } = req.body
      await User.create({ device_token })
      res.status(201).json({ message: 'Device registered' })
    } catch (e) {
      next(e)
    }
  }

  static async login(req: any, res: any, next: Function) {
    try {
      const { device_token } = req.body
      const user: IUserModel = await User.findOne({ device_token })
      if (user) {
        res.status(200).json(user)
      } else {
        next({ status: 404, message: 'No user with such device found' })
      }
    } catch (error) {
      next(error)
    }
  }
}

export default UserController
