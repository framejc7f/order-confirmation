import type { Currency, FulfillmentType, PaymentMethod, PricingBreakdown, Product } from './checkout'

export type Order = {
  id: string
  status: 'paid'
  product: Product
  fulfillment: FulfillmentType
  payment: PaymentMethod
  pricing: PricingBreakdown
  currency: Currency
  balanceBefore: number
  balanceAfter: number
  createdAt: string
}
