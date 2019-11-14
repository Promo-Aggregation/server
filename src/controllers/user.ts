import User, { IUser } from '../models/user'

class UserController {
  static async create(req: any, res: any, next: Function) {
    try {
      const { email, password, tags } = req.body
      const newUser: IUser = await User.create({ email, password, tags })
      res.status(201).json({ _id: newUser._id, email: newUser.email })
    } catch (e) {
      next(e)
    }
  }
}

export default UserController
