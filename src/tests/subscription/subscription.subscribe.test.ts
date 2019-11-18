import 'mocha'

import chai from 'chai'
import chaiHttp from 'chai-http'
import User from '../../models/user'
import app from '../../app'

const expect = chai.expect

chai.use(chaiHttp)

describe('Subscription Subscribe Test', function() {
  before(() => User.create({ device_token: '12345' }))
  after(() => User.deleteMany({}))

  const tags = ['dana', 'food']
  it('success add subscription', function(done) {
    chai
      .request(app)
      .put('/subscriptions/subscribe')
      .send({ tags })
      .set({ device_token: '12345' })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        const { body } = res
        expect(body).to.be.an('object')
        expect(body).to.have.property('subscription')
        const { subscription } = body
        expect(subscription).to.be.an('array')
        tags.forEach((el) => {
          expect(subscription).to.contain(el)
        })
        done()
      })
  })

  it('Fails subscribe - Token not set', function(done) {
    chai
      .request(app)
      .put('/subscriptions/subscribe')
      .send({ tags: ['dana', 'asdkjfalksdjf'] })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(400)
        const { body } = res
        expect(body).to.be.an('object')
        expect(body).to.have.property('message')
        expect(res.body.message).to.be.a('string')
        expect(res.body.message).to.include('token')
        done()
      })
  })
  it('Fails subscribe - Wrong token', function(done) {
    chai
      .request(app)
      .put('/subscriptions/subscribe')
      .send({ tags: ['dana', 'asdkjfalksdjf'] })
      .set({ device_token: '98765' })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(401)
        const { body } = res
        expect(body).to.be.an('object')
        expect(body).to.have.property('message')
        expect(res.body.message).to.be.a('string')
        expect(res.body.message).to.match(/device/i)
        done()
      })
  })
})
