import { Request, Response, NextFunction } from 'express'
import { danaFood, danaGame, danaEntertainment } from '../functions/dana'
import { Promo, IPromoModel } from '../models'

class DanaFetchDB {
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const [foods, games, entertainments] = await Promise.all([
        danaFood(),
        danaGame(),
        danaEntertainment()
      ])
      const fetched = [...foods, ...games, ...entertainments]
      const dbData: IPromoModel[] = await Promo.find({})
      const filtered: IPromoModel[] = fetched.filter(
        (el) => !dbData.some((dbDatum) => el.title === dbDatum.title)
      )
      if (filtered.length) {
        const newPromos: IPromoModel[] = await Promo.insertMany(filtered)
        res.status(200).json(newPromos)
      } else {
        res.status(200).json(filtered)
      }
    } catch (e) {
      next(e)
    }
  }
}

export default DanaFetchDB
