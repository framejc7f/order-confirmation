import { computed, type Ref } from 'vue'
import type { CheckoutPayload } from '@/types/checkout'
import { calculatePricing } from '@/utils/pricing'

export function useCheckoutPricing(
  checkout: Ref<CheckoutPayload | null>,
  fulfillmentTypeId: Ref<string>,
  paymentMethodId: Ref<string>
) {
  const selectedFulfillment = computed(
    () => checkout.value?.fulfillmentTypes.find((item) => item.id === fulfillmentTypeId.value) ?? null
  )

  const selectedPayment = computed(
    () => checkout.value?.paymentMethods.find((item) => item.id === paymentMethodId.value) ?? null
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

  const customerBalance = computed(() => checkout.value?.customer.balance ?? 0)
  const isBalancePayment = computed(() => selectedPayment.value?.balancePayment === true)
  const remainingBalance = computed(() => customerBalance.value - total.value)
  const canPayFromBalance = computed(() => {
    if (!isBalancePayment.value) {
      return true
    }

    return customerBalance.value >= total.value
  })
  const balancePaymentDisabledReason = computed(() => {
    if (!isBalancePayment.value) {
      return undefined
    }

    return customerBalance.value >= total.value ? undefined : 'Недостаточно средств'
  })

  const paymentTotals = computed<Record<string, number>>(() => {
    if (!checkout.value || !selectedFulfillment.value) {
      return {}
    }

    return Object.fromEntries(
      checkout.value.paymentMethods.map((method) => [
        method.id,
        calculatePricing(checkout.value!.product, selectedFulfillment.value!, method).total
      ])
    )
  })

  const paymentDisabledMap = computed<Record<string, string | undefined>>(() => {
    if (!checkout.value) {
      return {}
    }

    return Object.fromEntries(
      checkout.value.paymentMethods.map((method) => {
        if (!method.available) {
          return [method.id, 'Способ оплаты недоступен']
        }

        if (method.balancePayment && customerBalance.value < (paymentTotals.value[method.id] ?? 0)) {
          return [method.id, 'Недостаточно средств']
        }

        return [method.id, undefined]
      })
    )
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
    customerBalance,
    isBalancePayment,
    canPayFromBalance,
    remainingBalance,
    balancePaymentDisabledReason,
    paymentTotals,
    paymentDisabledMap
  }
}
