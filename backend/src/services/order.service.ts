import { checkoutData, orders } from '../data/checkoutData'
import type { CreateOrderPayload, Order } from '../types'
import { ApiError } from './errors'
import { calculatePricing } from './pricing'

let orderSequence = 10001

function isCreateOrderPayload(value: unknown): value is CreateOrderPayload {
  if (!value || typeof value !== 'object') return false
  const payload = value as Record<string, unknown>
  return (
    typeof payload.productId === 'string' &&
    typeof payload.fulfillmentTypeId === 'string' &&
    typeof payload.paymentMethodId === 'string'
  )
}

export function createOrder(body: unknown): Order {
  if (!isCreateOrderPayload(body)) {
    throw new ApiError(400, 'Invalid request body')
  }

  const product = checkoutData.product.id === body.productId ? checkoutData.product : null
  if (!product) {
    throw new ApiError(404, 'Product not found')
  }

  const fulfillment = checkoutData.fulfillmentTypes.find((item) => item.id === body.fulfillmentTypeId)
  if (!fulfillment) {
    throw new ApiError(400, 'Invalid fulfillment method')
  }

  const payment = checkoutData.paymentMethods.find((item) => item.id === body.paymentMethodId)
  if (!payment) {
    throw new ApiError(400, 'Invalid payment method')
  }

  if (!payment.available) {
    throw new ApiError(400, 'Payment method is unavailable')
  }

  const pricing = calculatePricing(product, fulfillment, payment)
  const balanceBefore = checkoutData.customer.balance

  if (payment.balancePayment && balanceBefore < pricing.total) {
    throw new ApiError(400, 'Insufficient balance')
  }

  const balanceAfter = payment.balancePayment ? balanceBefore - pricing.total : balanceBefore
  const order: Order = {
    id: `ORD-${orderSequence++}`,
    status: 'paid',
    product: { ...product },
    fulfillment: { ...fulfillment },
    payment: { ...payment },
    pricing,
    currency: product.currency,
    balanceBefore,
    balanceAfter,
    createdAt: new Date().toISOString()
  }

  orders.set(order.id, order)
  if (payment.balancePayment) {
    checkoutData.customer.balance = balanceAfter
  }

  return order
}

export function getOrderById(id: string) {
  const order = orders.get(id)
  if (!order) {
    throw new ApiError(404, 'Order not found')
  }

  return order
}
