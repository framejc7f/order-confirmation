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

export type CheckoutPayload = {
  product: {
    id: string
    name: string
    location: string
    image: string
    basePrice: number
    currency: 'RUB'
    packageSize: number
    unit: string
    hasDiscount: boolean
    discountPercent: number
    discountAmount: number
  }
  fulfillmentTypes: FulfillmentType[]
  paymentMethods: PaymentMethod[]
  customer: { balance: number; currency: 'RUB' }
  defaults: { fulfillmentTypeId: string; paymentMethodId: string }
}

export type Order = {
  id: string
  productName: string
  fulfillmentTypeId: string
  paymentMethodId: string
  total: number
  currency: 'RUB'
  balanceAfter: number
  createdAt: string
}
