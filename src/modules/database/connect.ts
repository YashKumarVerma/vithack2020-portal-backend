// load configurations
// load mongoose wrapper
import mongoose from 'mongoose'
import logger from '../logger/winston'

require('dotenv').config()
// define an instance of database

class Database {
  static connect(): void {
    mongoose
      .connect(
        process.env.DB_CONNECTION_STRING ||
          'mongodb://localhost:27017/vithack2020',
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
        },
      )
      .then(() => {
        logger.info('Database Connected')
      })
      .catch((err: any) => {
        logger.error('Database connection error')
        logger.error(err)
      })
  }
}

// pass instance of database
export default Database
