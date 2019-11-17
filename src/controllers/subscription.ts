import { IUserModel, User } from '../models'

class SubscriptionController {
  static async subscribe(req: any, res: any, next: Function) {
    const { device_token } = req.device_token
    const user: IUserModel = await User.findOneAndUpdate(
      { device_token },
      { $push: { tags: { $each: res.tags } } },
      { new: true }
    )
    res.status(200).json(user)
  }

  static async unsubscribe(req: any, res: any, next: Function) {
    const { device_token } = req.device_token
    const user: IUserModel = await User.findOneAndUpdate(
      { device_token },
      { $pull: { tags: { $each: res.tags } } },
      { new: true }
    )
    res.status(200).json(user)
  }
}

export default SubscriptionController
