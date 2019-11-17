import 'mocha'

import app from '../../app'
import chai from 'chai'
import chaiHttp from 'chai-http'
import { Promo } from '../../models'
import seed from './seed'

const expect = chai.expect
chai.use(chaiHttp)

describe('Promo Search Test', function() {
  this.timeout(10000)

  before(() => Promo.insertMany(seed))
  after(() => Promo.deleteMany({}))

  it('Success Search Query Test', function(done) {
    chai
      .request(app)
      .get('/promos/search?q=cashback')
      .end((err, res) => {
        expect(res).to.have.status(200)
        const { body, header } = res
        expect(header).to.have.property('count')
        expect(body).to.be.an('array')
        expect(body).to.have.lengthOf.greaterThan(0)
        body.forEach((el: any) => {
          expect(el).to.be.an('object')
          expect(el).to.have.property('_id')
          expect(el).to.have.property('title')
          expect(el.title).to.match(/cashback/i)
          expect(el).to.have.property('date')
          expect(el).to.have.property('detailUrl')
          expect(el).to.have.property('imageUrl')
          expect(el).to.have.property('kodePromo')
          expect(el).to.have.property('createdAt')
          expect(el).to.have.property('updatedAt')
        })
        done()
      })
  })
})
