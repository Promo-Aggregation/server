import { Promo } from '../models/promo'
import { Request, Response, NextFunction } from 'express'
import Redis from 'ioredis'

const redis = new Redis()

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

  static async getNewPromosCache(req: Request, res: Response, next: NextFunction) {
    try {
      const { device_token } = req
      const newPromoCache = await redis.get(`promos_user_${device_token}`)
      if (newPromoCache) {
        res.status(200).json(JSON.parse(newPromoCache))
      } else {
        next({ status: 404, message: 'No new promo for user cache found' })
      }
    } catch (e) {
      next(e)
    }
  }

  static async searchWithTagsAggregate(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        sort = 'createdAt',
        order = -1,
        offset = 0,
        limit = 20,
        tags = null,
        q = '',
      } = req.query
      console.log(q)
      console.log(tags)
      if (!tags.length || !Array.isArray(tags))
        return next({ status: 400, message: 'Tags must be an array of string' })
      const promos = await Promo.aggregate([
        {
          $match: { title: new RegExp(q, 'i') },
        },
        {
          $match: { tags: { $in: tags } },
        },
        {
          $sort: { [sort]: order },
        },
        {
          $limit: limit,
        },
        {
          $skip: offset,
        },
      ])
      res.status(200).json(promos)
    } catch (e) {
      next(e)
    }
  }
}

export default PromoDBController
