import { Promo } from '../models/promo'

interface Where {
  [key: string]: any
}

class PromoDBController {
  static async findAll(req: any, res: any, next: Function) {
    try {
      const { sort = 'createdAt', order = -1, offset = 0, limit = 20 } = req.query
      const [promos, count] = await Promise.all([
        Promo.find({})
          .limit(Number(limit))
          .skip(Number(offset))
          .sort({ [sort]: Number(order) }),
        Promo.find({})
          .limit(Number(limit))
          .skip(Number(offset))
          .sort({ [sort]: Number(order) })
          .countDocuments()
      ])
      res.set('count', count)
      res.status(200).json(promos)
    } catch (e) {
      next(e)
    }
  }
  static async search(req: any, res: any, next: Function) {
    try {
      const { q = '', sort = 'createdAt', order = -1, offset = 0, limit = 20 } = req.query

      const [promos, count] = await Promise.all([
        Promo.find({ title: new RegExp(q, 'gi') })
          .limit(Number(limit))
          .skip(Number(offset))
          .sort({ [sort]: Number(order) }),
        Promo.find({ title: new RegExp(q, 'gi') })
          .limit(Number(limit))
          .skip(Number(offset))
          .sort({ [sort]: Number(order) })
          .countDocuments()
      ])
      res.set('count', count)
      res.status(200).json(promos)
    } catch (e) {
      next(e)
    }
  }
  static async getByTags(req: any, res: any, next: Function) {
    try {
      const { sort = 'createdAt', order = -1, offset = 0, limit = 20, tags = null } = req.query
      if (!tags) return next({ status: 400, message: 'Please set tags to search promos' })

      const [promos, count] = await Promise.all([
        Promo.find({ tags: { $in: tags } })
          .limit(Number(limit))
          .skip(Number(offset))
          .sort({ [sort]: Number(order) }),
        Promo.find({ tags: { $in: tags } })
          .limit(Number(limit))
          .skip(Number(offset))
          .sort({ [sort]: Number(order) })
          .countDocuments()
      ])
      res.set('count', count)
      res.status(200).json(promos)
    } catch (e) {
      next(e)
    }
  }
  static async getBySubscriptions(req: any, res: any, next: Function) {
    try {
      const { sort = 'createdAt', order = -1, offset = 0, limit = 20 } = req.query
      const { subscription } = req
      let where: Where = {}
      if (subscription.length) {
        where.tags = { $in: subscription }
      } else {
        return res.status(200).json([])
      }
      const [promos, count] = await Promise.all([
        Promo.find(where)
          .limit(Number(limit))
          .skip(Number(offset))
          .sort({ [sort]: Number(order) }),
        Promo.find(where)
          .limit(Number(limit))
          .skip(Number(offset))
          .sort({ [sort]: Number(order) })
          .countDocuments()
      ])
      res.set('count', count)
      res.status(200).json(promos)
    } catch (e) {
      next(e)
    }
  }
}

export default PromoDBController
