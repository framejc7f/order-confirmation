import type { CheckoutPayload, PaymentMethod } from '../../backend/src/types'

export function calcTotal(data: CheckoutPayload, fulfillmentTypeId: string, paymentMethodId: string) {
  const fulfillment = data.fulfillmentTypes.find((item) => item.id === fulfillmentTypeId)
  const payment = data.paymentMethods.find((item) => item.id === paymentMethodId)
  if (!fulfillment || !payment) return data.product.basePrice
  const subtotal = data.product.basePrice - data.product.discountAmount
  const commission = Math.round((subtotal + fulfillment.surcharge) * (payment.commissionPercent / 100))
  return subtotal + fulfillment.surcharge + payment.surcharge + commission
}

export function isBalanceDisabled(payment: PaymentMethod, balance: number, total: number) {
  return Boolean(payment.balancePayment && balance < total)
}
