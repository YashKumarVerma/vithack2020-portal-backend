import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/', (req: Request, res: Response): void => {
  //   console.log(`index`)
  //   res.render(`index`, {
  //     siteKey: process.env.SITE_KEY,
  //   })
  res.json({
    message: 'hephaestus was here',
    version: '1.0.3',
    latestChange: 'cors added',
  })
})

export default router
