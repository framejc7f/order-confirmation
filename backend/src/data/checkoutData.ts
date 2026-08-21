import type { CheckoutPayload, Order } from '../types'

export const checkoutData: CheckoutPayload = {
  product: {
    id: 'coffee-beans-001',
    name: 'Premium Coffee Beans',
    location: 'Kazan / Vakhitovsky',
    image: '/product-coffee.svg',
    basePrice: 6500,
    currency: 'RUB',
    packageSize: 0.5,
    unit: 'kg',
    hasDiscount: true,
    discountPercent: 10,
    discountAmount: 650
  },
  fulfillmentTypes: [
    { id: 'standard', name: 'Pickup locker', surcharge: 0 },
    { id: 'express', name: 'Courier delivery', surcharge: 300 },
    { id: 'premium', name: 'Priority handoff', surcharge: 700 }
  ],
  paymentMethods: [
    { id: 'card', name: 'Card / bank transfer', logo: '/logos/card.svg', commissionPercent: 0, surcharge: 0, available: true },
    { id: 'sbp', name: 'Instant transfer', logo: '/logos/sbp.svg', commissionPercent: 1.5, surcharge: 0, available: true },
    { id: 'balance', name: 'Balance payment', logo: '/logos/balance.svg', commissionPercent: 0, surcharge: 0, available: true, balancePayment: true }
  ],
  customer: { balance: 7000, currency: 'RUB' },
  defaults: { fulfillmentTypeId: 'standard', paymentMethodId: 'card' }
}

export const orders = new Map<string, Order>()
