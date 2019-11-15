import User, { IUser } from '../models/user'

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
      const user: IUser = await User.findOne({ device_token })
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
}

export default UserController
