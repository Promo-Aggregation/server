import { Request, Response, NextFunction } from 'express'
import { User, IUserModel, IPromoModel } from '../models'
import { danaFood, danaGame, danaEntertainment } from '../functions/dana'
import { ovoFood } from '../functions/ovo'
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

  static async magic(req: Request, res: Response, next: NextFunction) {
    try {
      const users: IUserModel[] = await User.find({})
      const [danaFoods, danaGames, danaEntertainments, ovoFoods] = await Promise.all([
        danaFood(),
        danaGame(),
        danaEntertainment(),
        ovoFood()
      ])
      const aggregatedPromos: IPromoModel[] = [
        ...danaFoods,
        ...danaGames,
        ...danaEntertainments,
        ...ovoFoods
      ]
      for (let i = 0; i < users.length; i++) {
        const user = users[i]
        if (!user.device_token) continue
        const newPromos = aggregatedPromos.filter((aP: IPromoModel) =>
          aP.tags.some((tag) => user.subscription.includes(tag))
        )
        console.log(newPromos.length)
        await axios({
          url: 'https://exp.host/--/api/v2/push/send',
          method: 'POST',
          data: {
            to: user.device_token,
            body: `There are new ${newPromos.length} recommended promos curated for you`
          },
          headers: {
            host: 'exp.host',
            accept: 'application/json',
            'content-type': 'application/json'
          }
        })
      }
      res.status(200).json({ message: 'Magic Push sent' })
    } catch (e) {
      next(e)
    }
  }
}
