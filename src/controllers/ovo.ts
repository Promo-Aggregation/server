import { ovoFood } from '../functions/ovo'
import { Request, Response, NextFunction } from 'express'
import Redis from 'ioredis'

const redis = new Redis()

class OvoController {
  static async ovoFood(req: Request, res: Response, next: NextFunction) {
    try {
      const ovoFoodCache = await redis.get('ovo-food')
      if (ovoFoodCache) {
        res.status(200).json(JSON.parse(ovoFoodCache))
      } else {
        // const foods: any[] = await ovoFood()
        let foods: any
        ovoFood().then(async data => {
          console.log('==================')
          // console.log(foods)
          foods = data
          await redis.set('ovo-food', JSON.stringify(foods))
          res.status(200).json(foods)
        })
      }
    } catch (err) {
      next(err)
    }
  }
}

export default OvoController
