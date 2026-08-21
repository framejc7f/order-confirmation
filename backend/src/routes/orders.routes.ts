import { Router } from 'express'
import { createOrderController, getOrderController } from '../controllers/orders.controller'

export const ordersRouter = Router()

ordersRouter.post('/', createOrderController)
ordersRouter.get('/:id', getOrderController)
