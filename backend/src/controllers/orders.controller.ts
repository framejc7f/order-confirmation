import type { Request, Response } from 'express'
import { ApiError } from '../services/errors'
import { createOrder, getOrderById } from '../services/order.service'

function sendError(res: Response, error: unknown) {
  if (error instanceof ApiError) {
    return res.status(error.status).json({ message: error.message })
  }

  console.error(error)
  return res.status(500).json({ message: 'Internal server error' })
}

export function createOrderController(req: Request, res: Response) {
  try {
    const order = createOrder(req.body)
    res.status(201).json(order)
  } catch (error) {
    sendError(res, error)
  }
}

export function getOrderController(req: Request, res: Response) {
  try {
    res.json(getOrderById(String(req.params.id)))
  } catch (error) {
    sendError(res, error)
  }
}
