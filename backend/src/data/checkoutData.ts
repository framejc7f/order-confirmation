import type { CheckoutPayload, Order } from '../types'

export const checkoutData: CheckoutPayload = {
  product: {
    id: 'hash-001',
    name: '☘️ ГАШИШ ICE-O-LATOR ☘️',
    location: 'Москва / Ленинградский проспект',
    image: 'https://broker.mp/media/product_images/2024/8/21/955c29fc-2cdb-47d2-ad1c-c32399bfc1fe.jpg',
    basePrice: 2700,
    currency: 'rub',
    packageSize: 1,
    unit: 'г',
    hasDiscount: true,
    discountPercent: 10,
    discountAmount: 270,
  },
  fulfillmentTypes: [
    { id: 'prikop', name: 'Прикоп', surcharge: 0 },
    { id: 'stash', name: 'Тайник', surcharge: 50 },
    { id: 'magnet', name: 'Магнит', surcharge: 50 }
  ],
  paymentMethods: [
    { id: 'card', name: 'Карты и СБП РФ', logo: 'https://broker.mp/static/icons/russia_flag.png', commissionPercent: 0, surcharge: 0, available: true },
    { id: 'sng', name: 'СНГ-платежи (дешевле!)', logo: 'https://broker.mp/static/icons/random.png', commissionPercent: 0, surcharge: 0, available: true },
    { id: 'balance', name: 'Оплата с баланса', logo: 'https://broker.mp/static/icons/balance.png', commissionPercent: 0, surcharge: 0, available: true, balancePayment: true },
    { id: 'sbp', name: 'Альфа/Сбер/ТБанк/Газпром', logo: 'https://broker.mp/static/icons/nspk.png', commissionPercent: 0, surcharge: 0, available: true },
    { id: 'alfa', name: 'С Альфабанка на Альфабанк', logo: 'https://broker.mp/static/icons/alfabank.svg', commissionPercent: 0, surcharge: 0, available: true },
    { id: 'sber', name: 'С Сбербанка на Сбербанк', logo: 'https://broker.mp/static/icons/sber.png', commissionPercent: 0, surcharge: 0, available: true },
    { id: 'vtb', name: 'С ВТБ на ВТБ', logo: 'https://broker.mp/static/icons/VTB-logo.png', commissionPercent: 0, surcharge: 0, available: true },
  ],
  customer: { balance: 6200, currency: 'rub' },
  defaults: { fulfillmentTypeId: 'prikop', paymentMethodId: 'card' }
}

export const orders = new Map<string, Order>()
