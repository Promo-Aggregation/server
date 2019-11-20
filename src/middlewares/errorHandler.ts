import { Request, Response, NextFunction } from 'express'

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  let status: number
  let message: string

  if (err.isAxiosError) {
    res.status(err.response.status).json({ message: err.response.data })
  } else {
    switch (err.name) {
      case 'MongoError':
        if (err.code === 11000) {
          status = 400
          message = `device_token must be unique`
        } else {
          status = 500
          message = 'Something happened in the database'
        }
        break
      case 'TimeoutError':
        status = 408
        message = 'Server cannot get data from hosts in a set of time, please try again later'
      default:
        status = err.status || 500
        message = err.message || 'Internal Server Error'
        break
    }

    res.status(status).json({ message })
  }
}
