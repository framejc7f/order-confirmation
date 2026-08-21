export type CurrencyCode = 'rub' | 'usd'

export type PricingBreakdown = {
  subtotal: number
  discountAmount: number
  discountedPrice: number
  fulfillmentSurcharge: number
  paymentCommission: number
  paymentSurcharge: number
  total: number
}

export type ProductPricingInput = {
  basePrice: number
  hasDiscount: boolean
  discountAmount: number
}

export type FulfillmentPricingInput = {
  surcharge: number
}

export type PaymentPricingInput = {
  commissionPercent: number
  surcharge: number
}

export function roundMoney(value: number) {
  return Math.round(value)
}

export function resolveCurrencyCode(currency = 'rub') {
  const normalized = String(currency).trim().toLowerCase()

  if (normalized === 'usd') {
    return 'USD'
  }

  return 'RUB'
}

export function formatCurrency(value: number, currency = 'rub') {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: resolveCurrencyCode(currency),
    maximumFractionDigits: 0
  }).format(roundMoney(value))
}

export function calculatePricing(
  product: ProductPricingInput,
  fulfillment: FulfillmentPricingInput,
  payment: PaymentPricingInput
): PricingBreakdown {
  const discountAmount = product.hasDiscount ? roundMoney(product.discountAmount) : 0
  const discountedPrice = roundMoney(product.basePrice - discountAmount)
  const subtotal = discountedPrice
  const fulfillmentSurcharge = roundMoney(fulfillment.surcharge)
  const paymentCommission = roundMoney((subtotal + fulfillmentSurcharge) * (payment.commissionPercent / 100))
  const paymentSurcharge = roundMoney(payment.surcharge)

  return {
    subtotal,
    discountAmount,
    discountedPrice,
    fulfillmentSurcharge,
    paymentCommission,
    paymentSurcharge,
    total: roundMoney(subtotal + fulfillmentSurcharge + paymentCommission + paymentSurcharge)
  }
}
