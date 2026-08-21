import type { CheckoutPayload } from '../types'

export function calculateTotal(data: CheckoutPayload, fulfillmentTypeId: string, paymentMethodId: string) {
  const fulfillment = data.fulfillmentTypes.find((item) => item.id === fulfillmentTypeId)
  const payment = data.paymentMethods.find((item) => item.id === paymentMethodId)
  if (!fulfillment || !payment || !payment.available) {
    throw new Error('Invalid checkout selection')
  }
  const subtotal = data.product.basePrice - data.product.discountAmount
  const afterFulfillment = subtotal + fulfillment.surcharge
  const commission = Math.round(afterFulfillment * (payment.commissionPercent / 100))
  return afterFulfillment + payment.surcharge + commission
}
