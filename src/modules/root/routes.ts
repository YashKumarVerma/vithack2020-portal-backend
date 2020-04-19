import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/', (req: Request, res: Response): void => {
  res.render('index', {
    siteKey: process.env.SITE_KEY,
  })
})

export default router
