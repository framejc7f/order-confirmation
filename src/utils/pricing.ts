import type { FulfillmentType, PaymentMethod, PricingBreakdown, Product } from '@/types/checkout'
import { roundMoney } from './money'

export function calculatePricing(product: Product, fulfillment: FulfillmentType, payment: PaymentMethod): PricingBreakdown {
  const discountAmount = product.hasDiscount ? product.discountAmount : 0
  const discountedPrice = roundMoney(product.basePrice - discountAmount)
  const subtotal = discountedPrice
  const fulfillmentSurcharge = fulfillment.surcharge
  const paymentCommission = roundMoney((subtotal + fulfillmentSurcharge) * (payment.commissionPercent / 100))
  const paymentSurcharge = payment.surcharge

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
