import 'mocha'

import app from '../../app'
import chai from 'chai'
import chaiHttp from 'chai-http'
import { Promo } from '../../models'
import seed from './seed'

const expect = chai.expect
chai.use(chaiHttp)
