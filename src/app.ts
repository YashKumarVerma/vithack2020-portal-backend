// load express
import express from 'express'

// loading middle-wares
import bodyParser from 'body-parser'

import logger from './modules/logger/winston'

// connect to database
import database from './modules/database/connect'

// binding routes
import subscriptionRoutes from './modules/subscription/routes'

require('dotenv').config()

// create instance of express
const app = express()

// define port to start server on
const port = process.env.PORT || 3000
database.connect()

// parse valid requests only
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(bodyParser.json())

app.use('/subscription', subscriptionRoutes)

// start listening on ports
app.listen(port, () => {
  logger.info(`Express server started at port: ${port}`)
})
