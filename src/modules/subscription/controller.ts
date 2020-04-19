import { Request } from 'express'
import { SuccessResponse } from './interface'
import subscriptionModel from './schema'
import logger from '../logger/winston'

class subscriptionHandler {
  static add(req: Request) {
    return new Promise<SuccessResponse>((resolve, reject) => {
      if (!req.body.email) {
        reject({
          error: true,
          message: 'email required to add user to subscriber list',
        })
      }

      try {
        subscriptionModel
          .create({
            email: req.body.email,
          })
          .then(() => {
            resolve({
              error: false,
              message: 'User created successfully',
              payload: undefined,
            })
          })
          .catch((error: any) => {
            if (error.errmsg) {
              logger.error(`DB : ${error.errmsg}`)
              reject({
                error: true,
                payload: error.code,
                message: 'error in db operation to create a new user',
              })
            }

            if (error.errors) {
              logger.error(`Validation: ${error.message}`)
              reject({
                error: true,
                message: 'Validation Error',
                payload: error,
              })
            }

            // if no errors, then resolve with success
            reject({
              error: true,
              message: 'Unexpected error',
              payload: {},
            })
          })
      } catch (e) {
        reject({
          error: true,
          message: 'unexpected error in creating new user',
          payload: e,
        })
      }
    })
  }
}

export default subscriptionHandler
