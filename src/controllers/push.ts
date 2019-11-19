import { Request, Response, NextFunction } from 'express'
import { User, IUserModel } from '../models'
import axios from 'axios'

export default class PushController {
  static async push(req: Request, res: Response, next: NextFunction) {
    try {
      const users: IUserModel[] = await User.find({}).select('device_token')
      let arr = []
      users.forEach((user: IUserModel) => {
        if (!user.device_token) return
        arr.push(user.device_token)
      })
      await axios({
        url: 'https://exp.host/--/api/v2/push/send',
        method: 'POST',
        data: {
          to: arr,
          body: 'New promos available!!'
        },
        headers: {
          host: 'exp.host',
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
      res.status(200).json({ message: 'Push sent' })
    } catch (e) {
      next(e)
    }
  }
}
