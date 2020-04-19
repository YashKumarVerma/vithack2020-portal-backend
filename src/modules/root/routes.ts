import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/', (req: Request, res: Response): void => {
  res.render('index', {
    siteKey: '6LcuSOsUAAAAAJbI_N5O7-ara18XvfuRA0Y5Ybvg',
  })
})

export default router
