import { Promo } from '../models/promo'
import { Request, Response, NextFunction } from 'express'

interface Where {
  [key: string]: any
}

class PromoDBController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
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
          .countDocuments(),
      ])
      res.set('count', count.toString())
      res.status(200).json(promos)
    } catch (e) {
      next(e)
    }
  }
  static async search(req: Request, res: Response, next: NextFunction) {
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
          .countDocuments(),
      ])
      res.set('count', count.toString())
      res.status(200).json(promos)
    } catch (e) {
      next(e)
    }
  }
  static async getByTags(req: Request, res: Response, next: Function) {
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
          .countDocuments(),
      ])
      res.set('count', count.toString())
      res.status(200).json(promos)
    } catch (e) {
      next(e)
    }
  }
  static async getBySubscriptions(req: Request, res: Response, next: Function) {
    try {
      const { sort = 'createdAt', order = -1, offset = 0, limit = 20 } = req.query
      const { subscription } = req
      let where: Where = {}
      if (subscription.length) {
        where.tags = { $in: subscription }
      } else {
        return res.status(200).json([])
      }
      const [promos, count, allPromos] = await Promise.all([
        Promo.find(where)
          .limit(Number(limit))
          .skip(Number(offset))
          .sort({ [sort]: Number(order) }),
        Promo.find(where)
          .limit(Number(limit))
          .skip(Number(offset))
          .sort({ [sort]: Number(order) })
          .countDocuments(),
        Promo.find(where),
      ])
      await req.user.updateOne({ promos: allPromos })
      res.set('count', count.toString())
      res.status(200).json(promos)
    } catch (e) {
      next(e)
    }
  }
  static async searchWithTags(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        sort = 'createdAt',
        order = -1,
        offset = 0,
        limit = 20,
        tags = null,
        q = '',
      } = req.query
      const [promos, count] = await Promise.all([
        Promo.find({
          $and: [
            {
              tags: { $in: tags },
            },
            {
              title: new RegExp(q, 'gi'),
            },
          ],
        })
          .limit(Number(limit))
          .skip(Number(offset))
          .sort({ [sort]: Number(order) }),
        Promo.find({
          $and: [
            {
              tags: { $in: tags },
            },
            {
              title: new RegExp(q, 'gi'),
            },
          ],
        })
          .limit(Number(limit))
          .skip(Number(offset))
          .sort({ [sort]: Number(order) })
          .countDocuments(),
      ])
      res.set('count', count.toString())
      res.status(200).json(promos)
    } catch (e) {
      next(e)
    }
  }
}

export default PromoDBController
