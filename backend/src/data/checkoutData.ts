import type { CheckoutPayload, Order } from '../types'

export const checkoutData: CheckoutPayload = {
  product: {
    id: 'coffee-beans-001',
    name: 'Premium Coffee Beans',
    location: 'Kazan / Vakhitovsky',
    image: '/product-coffee.svg',
    basePrice: 6500,
    currency: 'rub',
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
    { id: 'sbp', name: 'Instant transfer', logo: '/logos/sbp.svg', commissionPercent: 1.5, surcharge: 100, available: true },
    { id: 'balance', name: 'Balance payment', logo: '/logos/balance.svg', commissionPercent: 0, surcharge: 0, available: true, balancePayment: true },
    { id: 'invoice', name: 'Corporate invoice', logo: '/logos/card.svg', commissionPercent: 0, surcharge: 100, available: false }
  ],
  customer: { balance: 6200, currency: 'rub' },
  defaults: { fulfillmentTypeId: 'standard', paymentMethodId: 'card' }
}

export const orders = new Map<string, Order>()
