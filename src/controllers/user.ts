import User, { IUser } from '../models/user'
import { check } from '../helpers/bcryptjs'
import { createToken } from '../helpers/jwt'

class UserController {
  static async register(req: any, res: any, next: Function) {
    try {
      const { email, password, tags } = req.body
      const user: IUser = await User.create({ email, password, tags })
      res.status(201).json({ _id: user._id, email: user.email })
    } catch (e) {
      next(e)
    }
  }

  static async login(req: any, res: any, next: Function) {
    try {
      const { email, password } = req.body
      const user: IUser = await User.findOne({ email })
      if (!user && !check(password, user.password)) {
        next({ status: 400, message: 'Wrong Email / Password' })
      } else {
        const token = createToken({ _id: user._id })
        res.status(200).json({ token })
      }
    } catch (error) {
      next(error)
    }
  }
}

export default UserController
