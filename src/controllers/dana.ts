import { Promo, IPromo, IPromoModel } from '../models/promo'
import { danaFood, danaGame, danaEntertainment } from '../functions/dana'

class DanaFetchController {
  static async danaFood(req: any, res: any, next: Function) {
    try {
      const foods: any[] = await danaFood()
      const data: IPromoModel[] = await Promo.insertMany(foods)
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async danaGame(req: any, res: any, next: Function) {
    try {
      const games: any[] = await danaGame()
      const data: IPromoModel[] = await Promo.insertMany(games)
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async danaEntertainment(req: any, res: any, next: Function) {
    try {
      const entertainments: any[] = await danaEntertainment()
      const data: IPromoModel[] = await Promo.insertMany(entertainments)
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }
}

export default DanaFetchController
