// @flow

import compression from 'compression'
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import routing from './routing'
import { WEB_PORT, STATIC_PATH, DATABASE } from '../shared/config'
import { isProd } from '../shared/util'

mongoose.Promise = global.Promise
mongoose.connect(DATABASE)

const app = express()
app.use(helmet())
app.use(bodyParser.json({ type: '*/*' }))
app.use(bodyParser.urlencoded({ extended: false })) // string or array
app.use(compression())
app.use(STATIC_PATH, express.static('dist'))

routing(app)

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
    '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`)
})
