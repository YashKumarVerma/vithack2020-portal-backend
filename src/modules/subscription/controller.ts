import { Request } from 'express'
import fetch from 'node-fetch'
import { SuccessResponse } from './interface'
import subscriptionModel from './schema'
import logger from '../logger/winston'

class subscriptionHandler {
  static add(req: Request) {
    return new Promise<SuccessResponse>(async (resolve, reject) => {
      // check for token
      if (!req.body.token) {
        reject({
          error: true,
          message: 'unauthorized request',
        })
      }

      // checking authenticiy of request
      const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${req.body.token}`
      await fetch(url, { method: 'post' })
        .then((response: any) => response.json())
        .then((googleResponse: any) => {
          if (!googleResponse.success) {
            reject({
              error: true,
              message: 'bot behavior detected',
              payload: googleResponse,
            })
          }
        })
        .catch((error: any) =>
          reject({
            error: true,
            message: 'Error contacting recaptcha server',
          }),
        )

      //   check if email passed
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
