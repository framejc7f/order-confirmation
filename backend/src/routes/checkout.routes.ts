import { Router } from 'express'
import { getCheckoutController } from '../controllers/checkout.controller'

export const checkoutRouter = Router()

checkoutRouter.get('/', getCheckoutController)
