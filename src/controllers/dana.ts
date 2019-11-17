import { danaFood, danaGame, danaEntertainment } from '../functions/dana'
import { Promo } from '../models'
import Redis from 'ioredis'

const redis = new Redis()

class DanaFetchController {
  static async danaFood(req: any, res: any, next: Function) {
    try {
      const danaFoodCache = await redis.get('dana-food')
      if (danaFoodCache) {
        res.status(200).json(JSON.parse(danaFoodCache))
      } else {
        const foods: any[] = await danaFood()
        console.log(foods)
        const a: any[] = await Promo.insertMany(foods)
        console.log(a)
        // await redis.set('dana-food', JSON.stringify(foods))
        res.status(200).json(a)
      }
    } catch (err) {
      next(err)
    }
  }

  static async danaGame(req: any, res: any, next: Function) {
    try {
      const danaGameCache = await redis.get('dana-games')
      if (danaGameCache) {
        res.status(200).json(JSON.parse(danaGameCache))
      } else {
        const games: any[] = await danaGame()
        await redis.set('dana-games', JSON.stringify(games))
        res.status(200).json(games)
      }
    } catch (err) {
      next(err)
    }
  }

  static async danaEntertainment(req: any, res: any, next: Function) {
    try {
      const danaEntertainmentCache = await redis.get('dana-entertainment')
      if (danaEntertainmentCache) {
        res.status(200).json(JSON.parse(danaEntertainmentCache))
      } else {
        const entertainments: any[] = await danaEntertainment()
        await redis.set('dana-entertainment', JSON.stringify(entertainments))
        res.status(200).json(entertainments)
      }
    } catch (err) {
      next(err)
    }
  }
}

export default DanaFetchController
