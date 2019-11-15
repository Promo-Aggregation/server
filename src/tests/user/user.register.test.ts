import 'mocha'

import chai from 'chai'
import chaiHttp from 'chai-http'
import { User } from '../../models'
import app from '../../app'

const expect = chai.expect

chai.use(chaiHttp)

describe('User Register Testing', () => {
  after(() => User.deleteMany({}))

  it('Success User Register', async () => {
    const userData = { device_token: '98765' }
    const res = await chai
      .request(app)
      .post('/users/register')
      .send(userData)
    expect(res).to.have.status(201)
    expect(res.body).to.be.an('object')
    expect(res.body).to.have.property('message')
    expect(res.body.message).to.be.a('string')
  })

  it('Fail User Register - Duplicate', async () => {
    const userData = { device_token: '98765' }
    const res = await chai
      .request(app)
      .post('/users/register')
      .send(userData)
    expect(res).to.have.status(400)
    expect(res.body).to.be.an('object')
    expect(res.body).to.have.property('message')
    expect(res.body.message).to.be.a('string')
    Promise.resolve()
  })
})
