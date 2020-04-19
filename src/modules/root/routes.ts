import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/', (req: Request, res: Response): void => {
  console.log('ROUTE HIT ')
  res.render('index', {
    siteKey: process.env.SITE_KEY,
    test: 'FUCK',
  })
})

export default router
