import { User, IUserModel } from 'src/models'

export const authentication = async (req: any, res: any, next: Function) => {
  const { device_token } = req.headers
  const user: IUserModel = await User.findOne({ device_token })
  if (user) {
    req.device_token = device_token
    req.subscription = user.subscription
    next()
  } else {
    next({ status: 401, message: 'Device is not registered on the server.' })
  }
}
