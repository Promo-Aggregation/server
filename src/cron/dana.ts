import { CronJob } from 'cron'
import { danaFood, danaGame, danaEntertainment } from '../functions/dana'
import { Promo, IPromoModel } from '../models'
import Redis from 'ioredis'

const redis = new Redis()

// new CronJob(
//   '* 0 0 * * *',
//   async () => {
//     try {
//       const [foods, games, entertainments] = await Promise.all([
//         danaFood(),
//         danaGame(),
//         danaEntertainment()
//       ])
//       await Promise.all([Promo.insertMany([...foods, ...games, ...entertainments])])
//     } catch (e) {
//       console.log(e)
//     }
//   },
//   null,
//   true,
//   'Asia/Jakarta'
// )

new CronJob(
  '* */15 * * * *',
  async () => {
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
  },
  null,
  true,
  'Asia/Jakarta'
)

new CronJob(
  '* 0 */2 * * *',
  async () => {
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
        await Promo.insertMany(filtered)
      }
    } catch (e) {
      console.log(e)
    }
  },
  null,
  true,
  'Asia/Jakarta'
)
