import { Request, Response, NextFunction } from 'express'
import { User, IUserModel, IPromoModel, Promo } from '../models'
import { danaFood, danaGame, danaEntertainment } from '../functions/dana'
import { ovoFood } from '../functions/ovo'
import axios from 'axios'
import Redis from 'ioredis'
import dummy from './dummy'

const redis = new Redis()

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
          body: 'New promos available!!',
        },
        headers: {
          host: 'exp.host',
          accept: 'application/json',
          'content-type': 'application/json',
        },
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
        ovoFood(),
      ])
      const aggregatedPromos: IPromoModel[] = [
        ...danaFoods,
        ...danaGames,
        ...danaEntertainments,
        ...ovoFoods,
      ]

      const oldPromos: IPromoModel[] = await Promo.find({})

      const filteredPromos: IPromoModel[] = aggregatedPromos.filter(
        (aP: IPromoModel) => !oldPromos.some((oP: IPromoModel) => aP.title === oP.title)
      )

      for (let i = 0; i < users.length; i++) {
        const user = users[i]

        if (!user.device_token) continue

        const newPromos = filteredPromos.filter((aP: IPromoModel) =>
          aP.tags.some((tag: string) => user.subscription.includes(tag))
        )

        const amountTrulyNewPromos = newPromos.length

        if (amountTrulyNewPromos > 0) {
          await redis.set(`promos_user_${user.device_token}`, JSON.stringify(newPromos))

          await axios({
            url: 'https://exp.host/--/api/v2/push/send',
            method: 'POST',
            data: {
              to: user.device_token,
              body: `There are new ${amountTrulyNewPromos} recommended promos curated for you`,
            },
            headers: {
              host: 'exp.host',
              accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
        }
      }

      res.status(200).json({ message: 'Magic Push sent' })
    } catch (e) {
      next(e)
    }
  }

  static async magicDummy(req: Request, res: Response, next: NextFunction) {
    try {
      const users: IUserModel[] = await User.find({})
      const dummyJSONPromos: any[] = dummy
      const oldPromos: IPromoModel[] = await Promo.find({})
      const filteredPromos: IPromoModel[] = dummyJSONPromos.filter(
        (dP: any) => !oldPromos.some((oP: IPromoModel) => dP.title === oP.title)
      )

      for (let i = 0; i < users.length; i++) {
        const user = users[i]

        if (!user.device_token) continue

        const newPromos = filteredPromos.filter((aP: IPromoModel) =>
          aP.tags.some((tag: string) => user.subscription.includes(tag))
        )

        const amountTrulyNewPromos = newPromos.length

        if (amountTrulyNewPromos > 0) {
          await redis.set(`promos_user_${user.device_token}`, JSON.stringify(newPromos))

          await axios({
            url: 'https://exp.host/--/api/v2/push/send',
            method: 'POST',
            data: {
              to: user.device_token,
              body: `There are new ${amountTrulyNewPromos} recommended promos curated for you`,
            },
            headers: {
              host: 'exp.host',
              accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
        }
      }
      res.status(200).json({ message: 'Magic Push sent' })
    } catch (e) {
      next(e)
    }
  }
}
