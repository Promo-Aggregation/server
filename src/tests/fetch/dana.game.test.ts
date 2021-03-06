import 'mocha'

import app from '../../app'
import chai from 'chai'
import chaiHttp from 'chai-http'
import { Promo } from '../../models'

const expect = chai.expect
chai.use(chaiHttp)

describe('Get Dana Game', function() {
  // this.timeout(10000)
  this.timeout(0)
  after(() => Promo.deleteMany({}))

  it('Success Get Dana Game', function(done) {
    chai
      .request(app)
      .get('/fetch/dana/game')
      .end((err: any, res: any) => {
        console.log(res.body)
        console.log(res.body.length)
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
        })
        done()
      })
  })
})
