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
        'mongodb+srv://octave:octave@cluster0-izz6b.mongodb.net/test?retryWrites=true&w=majority',
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
