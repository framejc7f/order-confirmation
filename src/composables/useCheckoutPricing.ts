import { computed, type Ref } from 'vue'
import type { CheckoutPayload } from '@/types/checkout'
import { calculatePricing } from '@/utils/pricing'

export function useCheckoutPricing(
  checkout: Ref<CheckoutPayload | null>,
  fulfillmentTypeId: Ref<string>,
  paymentMethodId: Ref<string>
) {
  const selectedFulfillment = computed(() =>
    checkout.value?.fulfillmentTypes.find((item) => item.id === fulfillmentTypeId.value) ?? null
  )

  const selectedPayment = computed(() =>
    checkout.value?.paymentMethods.find((item) => item.id === paymentMethodId.value) ?? null
  )

  const pricing = computed(() => {
    if (!checkout.value || !selectedFulfillment.value || !selectedPayment.value) {
      return {
        subtotal: 0,
        discountAmount: 0,
        discountedPrice: 0,
        fulfillmentSurcharge: 0,
        paymentCommission: 0,
        paymentSurcharge: 0,
        total: 0
      }
    }

    return calculatePricing(checkout.value.product, selectedFulfillment.value, selectedPayment.value)
  })
  const subtotal = computed(() => pricing.value.subtotal)
  const discountAmount = computed(() => pricing.value.discountAmount)
  const discountedPrice = computed(() => pricing.value.discountedPrice)
  const fulfillmentSurcharge = computed(() => pricing.value.fulfillmentSurcharge)
  const paymentCommission = computed(() => pricing.value.paymentCommission)
  const paymentSurcharge = computed(() => pricing.value.paymentSurcharge)
  const total = computed(() => pricing.value.total)
  const remainingBalance = computed(() => (checkout.value?.customer.balance ?? 0) - total.value)
  const canPayFromBalance = computed(() => {
    if (!selectedPayment.value?.balancePayment) return true
    return remainingBalance.value >= 0
  })

  return {
    selectedFulfillment,
    selectedPayment,
    subtotal,
    discountAmount,
    discountedPrice,
    fulfillmentSurcharge,
    paymentCommission,
    paymentSurcharge,
    total,
    canPayFromBalance,
    remainingBalance
  }
}
