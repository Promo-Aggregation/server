import 'mocha'

import chai from 'chai'
import chaiHttp from 'chai-http'
import { User, IUser } from '../../models'
import app from '../../app'

const expect = chai.expect

chai.use(chaiHttp)

describe('User Register Testing', () => {
  before(async () => {
    const user = { email: 'tigor@email.com', password: '12345' }
    const res = await chai
      .request(app)
      .post('/users/register')
      .send(user)
  })
})
