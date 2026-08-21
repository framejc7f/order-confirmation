import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getCheckout } from '@/services/checkoutService'
import { createOrder } from '@/services/orderService'
import type { CheckoutPayload } from '@/types/checkout'
import type { Order } from '@/types/order'

function toUserMessage(error: unknown, fallback: string) {
  if (error instanceof Error) {
    if (error.message === 'Insufficient balance') return 'Недостаточно средств'
    if (error.message === 'Network error') return 'Проверьте подключение и повторите попытку'
    return error.message
  }

  return fallback
}

export const useCheckoutStore = defineStore('checkout', () => {
  const checkout = ref<CheckoutPayload | null>(null)
  const selectedFulfillmentTypeId = ref('')
  const selectedPaymentMethodId = ref('')
  const loading = ref(false)
  const error = ref('')
  const submitting = ref(false)
  const createError = ref('')
  const createdOrder = ref<Order | null>(null)

  const selectedFulfillment = computed(() =>
    checkout.value?.fulfillmentTypes.find((item) => item.id === selectedFulfillmentTypeId.value) ?? null
  )

  const selectedPayment = computed(() =>
    checkout.value?.paymentMethods.find((item) => item.id === selectedPaymentMethodId.value) ?? null
  )

  async function loadCheckout() {
    loading.value = true
    error.value = ''

    try {
      const data = await getCheckout()
      checkout.value = data
      selectedFulfillmentTypeId.value = data.defaults.fulfillmentTypeId
      selectedPaymentMethodId.value = data.defaults.paymentMethodId
    } catch (loadError) {
      error.value = toUserMessage(loadError, 'Не удалось загрузить данные заказа')
    } finally {
      loading.value = false
    }
  }

  function selectFulfillment(id: string) {
    selectedFulfillmentTypeId.value = id
  }

  function selectPayment(id: string) {
    const payment = checkout.value?.paymentMethods.find((item) => item.id === id)
    if (!payment?.available) return
    selectedPaymentMethodId.value = id
  }

  async function submitOrder() {
    if (!checkout.value || submitting.value) return null

    submitting.value = true
    createError.value = ''

    try {
      const order = await createOrder({
        productId: checkout.value.product.id,
        fulfillmentTypeId: selectedFulfillmentTypeId.value,
        paymentMethodId: selectedPaymentMethodId.value
      })
      createdOrder.value = order
      checkout.value.customer.balance = order.balanceAfter
      return order
    } catch (submitError) {
      createError.value = toUserMessage(submitError, 'Не удалось оформить заказ')
      return null
    } finally {
      submitting.value = false
    }
  }

  return {
    checkout,
    selectedFulfillmentTypeId,
    selectedPaymentMethodId,
    selectedFulfillment,
    selectedPayment,
    loading,
    error,
    submitting,
    createError,
    createdOrder,
    loadCheckout,
    selectFulfillment,
    selectPayment,
    submitOrder
  }
})
