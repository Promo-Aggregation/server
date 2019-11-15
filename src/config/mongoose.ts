import { connect } from 'mongoose'

const environment = process.env.NODE_ENV || ''
const database = process.env.DATABASE || 'Promo-Aggregator'
const uri =
  'mongodb+srv://admin:admin@tigorhutasuhut-vdnzf.mongodb.net/Process-Aggregator?retryWrites=true&w=majority'
;(async () => {
  try {
    await connect(
      uri,
      {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    )
    console.log('Connected to mongodb', uri)
  } catch (e) {
    console.log(e)
  }
})()
