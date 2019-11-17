import { CronJob } from 'cron'
import { danaFood, danaGame, danaEntertainment } from '../functions/dana'
import { Promo } from '../models'

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
