import { Router } from 'express'
import { checkoutData } from '../data/checkoutData'

export const checkoutRouter = Router()

checkoutRouter.get('/', (_req, res) => {
  res.json(checkoutData)
})
