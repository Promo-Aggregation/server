import 'mocha'

import chai from 'chai'
import chaiHttp from 'chai-http'
import { User } from '../../models'
import app from '../../app'

const expect = chai.expect
chai.use(chaiHttp)

describe('User Login Testing', () => {
  const userData = { device_token: '12345' }
  before(() => User.create(userData))
  after(() => User.deleteMany({}))

  it('Success User Login', async () => {
    const res = await chai
      .request(app)
      .post('/users/login')
      .send(userData)
    expect(res).to.have.status(200)
    expect(res.body).to.be.an('object')
    expect(res.body).to.have.property('device_token')
    expect(res.body).to.have.property('subscription')
    const { device_token, subscription } = res.body
    expect(device_token).to.be.a('string')
    expect(subscription).to.be.an('array')
    subscription.forEach((el: string) => {
      expect(el).to.be.a('string')
    })
  })

  it('Fails User Login - No such token', async () => {
    const wrongData = { device_token: '98765' }
    const res = await chai
      .request(app)
      .post('/users/login')
      .send(wrongData)
    expect(res).to.have.status(404)
    expect(res.body).to.be.an('object')
    expect(res.body).to.have.property('message')
    expect(res.body.message).to.be.a('string')
  })
})
