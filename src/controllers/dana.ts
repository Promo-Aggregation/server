import { danaFood, danaGame, danaEntertainment } from '../functions/dana'

class DanaFetchController {
  static async danaFood(req: any, res: any, next: Function) {
    try {
      const foods: any[] = await danaFood()
      res.status(200).json(foods)
    } catch (err) {
      next(err)
    }
  }

  static async danaGame(req: any, res: any, next: Function) {
    try {
      const games: any[] = await danaGame()
      res.status(200).json(games)
    } catch (err) {
      next(err)
    }
  }

  static async danaEntertainment(req: any, res: any, next: Function) {
    try {
      const entertainments: any[] = await danaEntertainment()
      res.status(200).json(entertainments)
    } catch (err) {
      next(err)
    }
  }
}

export default DanaFetchController
