import type { Request, Response } from 'express'
import { getCheckout } from '../services/checkout.service'

export function getCheckoutController(_req: Request, res: Response) {
  res.json(getCheckout())
}
