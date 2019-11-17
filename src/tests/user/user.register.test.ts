import 'mocha'

import chai from 'chai'
import chaiHttp from 'chai-http'
import { User } from '../../models'
import app from '../../app'

const expect = chai.expect

chai.use(chaiHttp)

describe('User Register Testing', function() {
  this.timeout(10000)
  after(() => User.deleteMany({}))

  it('Success User Register', done => {
    const userData = { device_token: '98765' }
    chai
      .request(app)
      .post('/users/register')
      .send(userData)
      .end((err, res) => {
        expect(res).to.have.status(201)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.be.a('string')
        done()
      })
  })

  it('Fail User Register - Duplicate', done => {
    const userData = { device_token: '98765' }
    chai
      .request(app)
      .post('/users/register')
      .send(userData)
      .end((err, res) => {
        expect(res).to.have.status(400)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.be.a('string')
        done()
      })
  })
})
