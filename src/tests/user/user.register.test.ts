import 'mocha'

import chai from 'chai'
import chaiHttp from 'chai-http'
import { User } from '../../models'
import app from '../../app'

const expect = chai.expect
let olduser: any

chai.use(chaiHttp)

describe('User Register Testing', () => {
  before(async () => {
    const user = { email: 'dummy@email.com', password: '12345' }
    olduser = await chai
      .request(app)
      .post('/users/register')
      .send(user)
  })

  after(async () => {
    await User.deleteMany({})
  })

  describe('Success User Register', () => {
    console.log('masuk')
    console.log(olduser)
  })
})
