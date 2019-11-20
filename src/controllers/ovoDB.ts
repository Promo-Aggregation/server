import { Request, Response, NextFunction } from 'express'
import { ovoFood } from '../functions/ovo'
import { Promo, IPromoModel } from '../models'

class OvoFetchDB {
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      let foods: any
      ovoFood().then(async data => {
        foods = data
        console.log('DB')
        console.log(foods)
        const fetched = [...foods]
        const dbData: IPromoModel[] = await Promo.find({})
        const filtered: IPromoModel[] = fetched.filter(
          el => !dbData.some(dbDatum => el.title === dbDatum.title)
        )
        if (filtered.length) {
          const newPromos: IPromoModel[] = await Promo.insertMany(filtered)
          res.status(200).json(newPromos)
        } else {
          res.status(200).json(filtered)
        }
      })
    } catch (err) {
      next(err)
    }
  }
}

export default OvoFetchDB
