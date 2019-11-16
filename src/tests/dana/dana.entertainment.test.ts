import 'mocha'

import app from '../../app'
import chai from 'chai'
import chaiHttp from 'chai-http'
import { Promo } from '../../models'

const expect = chai.expect
chai.use(chaiHttp)

describe('Get Dana Entertainment', function() {
  this.timeout(10000)
  after(() => Promo.deleteMany({}))

  it('Success Get Dana Entertainment', function(done) {
    chai
      .request(app)
      .get('/promos/dana-entertainment')
      .end((err: any, res: any) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.lengthOf.greaterThan(0)
        res.body.forEach((el: any) => {
          expect(el).to.be.an('object')
          expect(el).to.have.property('_id')
          expect(el).to.have.property('title')
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
