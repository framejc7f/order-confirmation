import { Router } from 'express'
import { checkoutData, orders } from '../data/checkoutData'
import { calculateTotal } from '../services/pricing'

export const ordersRouter = Router()

ordersRouter.post('/', (req, res) => {
  const { productId, fulfillmentTypeId, paymentMethodId } = req.body as Record<string, string>
  if (productId !== checkoutData.product.id) {
    return res.status(400).json({ message: 'Invalid product' })
  }
  const total = calculateTotal(checkoutData, fulfillmentTypeId, paymentMethodId)
  const payment = checkoutData.paymentMethods.find((item) => item.id === paymentMethodId)
  const customer = checkoutData.customer
  if (!payment) return res.status(400).json({ message: 'Invalid payment method' })
  if (payment.balancePayment && customer.balance < total) {
    return res.status(400).json({ message: 'Insufficient balance' })
  }
  const balanceAfter = payment.balancePayment ? customer.balance - total : customer.balance
  const orderId = `ord_${Date.now()}`
  const order = {
    id: orderId,
    productName: checkoutData.product.name,
    fulfillmentTypeId,
    paymentMethodId,
    total,
    currency: 'RUB' as const,
    balanceAfter,
    createdAt: new Date().toISOString()
  }
  orders.set(orderId, order)
  if (payment.balancePayment) checkoutData.customer.balance = balanceAfter
  res.status(201).json(order)
})

ordersRouter.get('/:id', (req, res) => {
  const order = orders.get(req.params.id)
  if (!order) return res.status(404).json({ message: 'Order not found' })
  res.json(order)
})
