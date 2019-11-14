export default (err: any, req: any, res: any) => {
  let status: number
  let message: string

  if (err.isAxiosError) {
    res.status(err.response.status).json({ message: err.response.data })
  } else {
    switch (err.name) {
      case 'Validation Error':
        break

      default:
        status = err.status || 500
        message = err.message || 'Internal Server Error'
        break
    }

    res.status(status).json({ message })
  }
}
