import express, { Request, Response } from 'express'

import subscriptionHandler from './controller'
import { SuccessResponse } from './interface'

const router = express.Router()

router.post('/add', (req: Request, res: Response): void => {
  subscriptionHandler
    .add(req)
    .then((resp: SuccessResponse) => {
      res.status(200).json(resp)
    })
    .catch((error) => {
      res.status(400).json(error)
    })
})

export default router
