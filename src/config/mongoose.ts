import { connect } from 'mongoose'

const environment = process.env.NODE_ENV || ''
const database = process.env.DATABASE || 'Promo-Aggregator'
const uri =
  process.env.MONGO_DB || `mongodb://localhost:27017/${database}${environment}`
;(async () => {
  try {
    await connect(
      uri,
      {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    console.log('Connected to mongodb', uri)
  } catch (e) {
    console.log(e)
  }
})()
