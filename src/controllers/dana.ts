import { Promo, IPromo, IPromoModel } from '../models/promo'
import { danaFood, danaGame, danaEntermainment } from '../functions/dana'

class DanaController {
  static async danaFood(req: any, res: any, next: Function) {
    try {
      const foods: any[] = await danaFood()
      const data: IPromoModel[] = await Promo.insertMany(foods)
      console.log(data)
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async danaGame(req: any, res: any, next: Function) {
    try {
      const games: any[] = await danaGame()
      const data: IPromoModel[] = await Promo.insertMany(games)
      console.log(data)
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async danaEntermainment(req: any, res: any, next: Function) {
    try {
      const entertainments: any[] = await danaEntermainment()
      const data: IPromoModel[] = await Promo.insertMany(entertainments)
      console.log(data)
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }
}

export default DanaController
