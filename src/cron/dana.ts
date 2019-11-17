import { CronJob } from 'cron'
import { danaFood, danaGame, danaEntertainment } from '../functions/dana'
import { Promo } from '../models'
import Redis from 'ioredis'

const redis = new Redis()

new CronJob('* 0 0 * * *', async () => {
  try {
    const [foods, games, entertainments] = await Promise.all([
      danaFood(),
      danaGame(),
      danaEntertainment()
    ])
    await Promise.all([Promo.insertMany([...foods, ...games, ...entertainments])])
  } catch (e) {
    console.log(e)
  }
})

new CronJob('* */15 * * *', async () => {
  try {
    const [foods, games, entertainments] = await Promise.all([
      danaFood(),
      danaGame(),
      danaEntertainment()
    ])
    await Promise.all([
      redis.set('dana-food', JSON.stringify(foods)),
      redis.set('dana-games', JSON.stringify(games)),
      redis.set('dana-entertainment', JSON.stringify(entertainments))
    ])
  } catch (e) {
    console.log(e)
  }
})
