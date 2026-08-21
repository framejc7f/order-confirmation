export type Currency = 'rub' | 'usd'

export type Product = {
  id: string
  name: string
  location: string
  image: string
  basePrice: number
  currency: Currency
  packageSize: number
  unit: string
  hasDiscount: boolean
  discountPercent: number
  discountAmount: number
}

export type FulfillmentType = {
  id: string
  name: string
  surcharge: number
}

export type PaymentMethod = {
  id: string
  name: string
  logo: string
  commissionPercent: number
  surcharge: number
  available: boolean
  balancePayment?: boolean
}

export type Customer = {
  balance: number
  currency: Currency
}

export type CheckoutPayload = {
  product: Product
  fulfillmentTypes: FulfillmentType[]
  paymentMethods: PaymentMethod[]
  customer: Customer
  defaults: { fulfillmentTypeId: string; paymentMethodId: string }
}

export type PricingBreakdown = {
  subtotal: number
  discountAmount: number
  discountedPrice: number
  fulfillmentSurcharge: number
  paymentCommission: number
  paymentSurcharge: number
  total: number
}

export type CreateOrderPayload = {
  productId: string
  fulfillmentTypeId: string
  paymentMethodId: string
}

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
