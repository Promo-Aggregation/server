import 'mocha'

import app from '../../app'
import chai from 'chai'
import chaiHttp from 'chai-http'
import { Promo } from '../../models'

const expect = chai.expect
chai.use(chaiHttp)

describe('Get Dana Food', function() {
  // this.timeout(30000)
  this.timeout(0)
  after(() => Promo.deleteMany({}))

  it('Success Get Dana Food', function(done) {
    chai
      .request(app)
      .get('/fetch/ovo/food')
      .end((err: any, res: any) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.lengthOf.greaterThan(0)
        res.body.forEach((el: any) => {
          expect(el).to.be.an('object')
          expect(el).to.have.property('title')
          expect(el).to.have.property('date')
          expect(el).to.have.property('detailUrl')
          expect(el).to.have.property('imageUrl')
          expect(el).to.have.property('kodePromo')
          expect(el).to.have.property('tags')
          expect(el).to.have.property('detail')
          expect(el).to.have.property('minimalTransaction')
          expect(el).to.have.property('cashback')
        })
        done()
      })
  })
})
