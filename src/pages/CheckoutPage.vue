<template>
  <main class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
    <section class="mb-8 max-w-3xl">
      <p class="text-sm font-semibold uppercase tracking-wide text-zinc-500">Подтверждение заказа</p>
      <h1 class="mt-2 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">Проверьте товар, получение и оплату</h1>
    </section>

    <section v-if="loading" class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
      <div class="space-y-6">
        <Skeleton class="h-56 w-full" />
        <Skeleton class="h-64 w-full" />
        <Skeleton class="h-80 w-full" />
      </div>
      <div class="space-y-6">
        <Skeleton class="h-72 w-full" />
        <Skeleton class="h-32 w-full" />
      </div>
    </section>

    <Alert v-else-if="error" class="max-w-xl">
      <p class="font-semibold">Не удалось загрузить данные заказа</p>
      <p class="mt-1">{{ error }}</p>
      <Button class="mt-4" variant="outline" @click="store.loadCheckout">Повторить</Button>
    </Alert>

    <section v-else-if="checkout" class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
      <div class="space-y-6">
        <ProductCard :product="checkout.product" />
        <FulfillmentSelector
          v-model="selectedFulfillmentTypeId"
          :options="checkout.fulfillmentTypes"
        />
        <PaymentMethodSelector
          :model-value="selectedPaymentMethodId"
          :methods="checkout.paymentMethods"
          :totals="paymentTotals"
          :disabled-map="paymentDisabledMap"
          @update:model-value="handlePaymentChange"
        />
      </div>

      <aside class="space-y-6 lg:sticky lg:top-24">
        <OrderSummary
          :product-price="checkout.product.basePrice"
          :discount-amount="discountAmount"
          :fulfillment-surcharge="fulfillmentSurcharge"
          :payment-commission="paymentCommission"
          :payment-surcharge="paymentSurcharge"
          :total="total"
          :show-balance="Boolean(selectedPayment?.balancePayment)"
          :balance="checkout.customer.balance"
          :remaining-balance="remainingBalance"
        />
        <BalanceCard
          :balance="checkout.customer.balance"
          :total="total"
          :remaining-balance="remainingBalance"
          :selected-balance-payment="Boolean(selectedPayment?.balancePayment)"
          :can-pay="canPayFromBalance"
        />
        <CheckoutActions
          :total="total"
          :balance-payment="Boolean(selectedPayment?.balancePayment)"
          :submitting="submitting"
          :disabled="submitDisabled"
          :error="createError"
          @submit="handleSubmit"
        />
      </aside>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import Alert from '@/components/ui/Alert.vue'
import Button from '@/components/ui/Button.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import BalanceCard from '@/components/checkout/BalanceCard.vue'
import CheckoutActions from '@/components/checkout/CheckoutActions.vue'
import FulfillmentSelector from '@/components/checkout/FulfillmentSelector.vue'
import OrderSummary from '@/components/checkout/OrderSummary.vue'
import PaymentMethodSelector from '@/components/checkout/PaymentMethodSelector.vue'
import ProductCard from '@/components/checkout/ProductCard.vue'
import { useCheckoutPricing } from '@/composables/useCheckoutPricing'
import { useCheckoutStore } from '@/stores/useCheckoutStore'
import { calculatePricing } from '@/utils/pricing'

const router = useRouter()
const store = useCheckoutStore()
const {
  checkout,
  selectedFulfillmentTypeId,
  selectedPaymentMethodId,
  selectedFulfillment,
  selectedPayment,
  loading,
  error,
  submitting,
  createError
} = storeToRefs(store)

const {
  discountAmount,
  fulfillmentSurcharge,
  paymentCommission,
  paymentSurcharge,
  total,
  canPayFromBalance,
  remainingBalance
} = useCheckoutPricing(checkout, selectedFulfillmentTypeId, selectedPaymentMethodId)

const paymentTotals = computed(() => {
  if (!checkout.value || !selectedFulfillment.value) return {}

  return Object.fromEntries(
    checkout.value.paymentMethods.map((method) => [
      method.id,
      calculatePricing(checkout.value!.product, selectedFulfillment.value!, method).total
    ])
  )
})

const paymentDisabledMap = computed<Record<string, string | undefined>>(() => {
  if (!checkout.value) return {}

  return Object.fromEntries(
    checkout.value.paymentMethods.map((method) => {
      if (!method.available) return [method.id, 'Способ оплаты недоступен']
      if (method.balancePayment && checkout.value!.customer.balance < (paymentTotals.value[method.id] ?? 0)) {
        return [method.id, 'Недостаточно средств']
      }
      return [method.id, undefined]
    })
  )
})

const submitDisabled = computed(() => {
  const disabledReason = paymentDisabledMap.value[selectedPaymentMethodId.value]
  return Boolean(disabledReason || submitting.value || !checkout.value || !selectedFulfillment.value || !selectedPayment.value)
})

function handlePaymentChange(id: string) {
  if (paymentDisabledMap.value[id]) return
  store.selectPayment(id)
}

async function handleSubmit() {
  if (submitDisabled.value) return
  const order = await store.submitOrder()
  if (order) {
    router.push(`/orders/${order.id}`)
  }
}

onMounted(() => {
  if (!checkout.value) {
    store.loadCheckout()
  }
})
</script>
