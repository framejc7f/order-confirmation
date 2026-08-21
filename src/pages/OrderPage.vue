<template>
  <main class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
    <section v-if="loading" class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
      <Skeleton class="h-96 w-full" />
      <Skeleton class="h-80 w-full" />
    </section>

    <Alert v-else-if="error" class="max-w-xl">
      <p class="font-semibold">Не удалось загрузить заказ</p>
      <p class="mt-1">{{ error }}</p>
      <Button class="mt-4" variant="outline" @click="loadOrder">Повторить</Button>
    </Alert>

    <section v-else-if="order" class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
      <div class="space-y-6">
        <Card class="p-6">
          <Badge variant="success">Заказ успешно оформлен</Badge>
          <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 class="text-3xl font-bold tracking-tight text-zinc-950">Заказ № {{ order.id }}</h1>
              <p class="mt-1 text-sm text-zinc-600">Статус: {{ statusLabel }}</p>
            </div>
            <p class="text-sm text-zinc-500">{{ createdAtLabel }}</p>
          </div>
        </Card>

        <Card class="overflow-hidden">
          <div class="grid gap-5 p-5 sm:grid-cols-[160px_1fr]">
            <div class="flex aspect-square items-center justify-center rounded-lg bg-zinc-50 p-4">
              <img class="h-full w-full object-contain" :src="order.product.image" :alt="`${order.product.name} image`" />
            </div>
            <div class="space-y-4">
              <div>
                <h2 class="text-2xl font-bold text-zinc-950">{{ order.product.name }}</h2>
                <p class="mt-2 text-sm text-zinc-600">{{ order.product.packageSize }} {{ order.product.unit }}</p>
                <p class="mt-1 text-sm text-zinc-600">{{ order.product.location }}</p>
              </div>
              <div class="grid gap-3 sm:grid-cols-2">
                <div class="rounded-lg bg-zinc-50 p-4">
                  <p class="text-sm text-zinc-600">Способ получения</p>
                  <p class="mt-1 font-semibold text-zinc-950">{{ order.fulfillment.name }}</p>
                </div>
                <div class="rounded-lg bg-zinc-50 p-4">
                  <p class="text-sm text-zinc-600">Способ оплаты</p>
                  <div class="mt-1 flex items-center gap-2">
                    <img class="h-6 w-6 rounded border border-zinc-200 bg-white p-1" :src="order.payment.logo" :alt="`${order.payment.name} logo`" />
                    <p class="font-semibold text-zinc-950">{{ order.payment.name }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <aside class="space-y-6 lg:sticky lg:top-24">
        <OrderSummary
          :product-price="order.product.basePrice"
          :discount-amount="order.pricing.discountAmount"
          :fulfillment-surcharge="order.pricing.fulfillmentSurcharge"
          :payment-commission="order.pricing.paymentCommission"
          :payment-surcharge="order.pricing.paymentSurcharge"
          :total="order.pricing.total"
          :currency="order.currency"
          :show-balance="order.payment.balancePayment === true"
          :balance="order.balanceBefore"
          :remaining-balance="order.balanceAfter"
        />
        <Card class="p-5">
          <div class="space-y-3 text-sm">
            <div class="flex justify-between gap-4">
              <span class="text-zinc-600">Баланс до</span>
              <span class="font-semibold text-zinc-950">{{ formatCurrency(order.balanceBefore, order.currency) }}</span>
            </div>
            <div class="flex justify-between gap-4">
              <span class="text-zinc-600">Баланс после</span>
              <span class="font-semibold text-emerald-700">{{ formatCurrency(order.balanceAfter, order.currency) }}</span>
            </div>
          </div>
          <RouterLink to="/" class="mt-5 inline-flex h-11 w-full items-center justify-center rounded-md bg-zinc-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2">
            Вернуться к покупкам
          </RouterLink>
        </Card>
      </aside>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import Alert from '@/components/ui/Alert.vue'
import Badge from '@/components/ui/Badge.vue'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import OrderSummary from '@/components/checkout/OrderSummary.vue'
import { getOrder } from '@/services/orderService'
import type { Order } from '@/types/order'
import { formatCurrency } from '@/utils/money'

const route = useRoute()
const order = ref<Order | null>(null)
const loading = ref(false)
const error = ref('')

const statusLabel = computed(() => {
  if (!order.value) return ''
  return order.value.status === 'paid' ? 'Оплачен' : order.value.status
})

const createdAtLabel = computed(() => {
  if (!order.value) return ''
  return new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(order.value.createdAt))
})

async function loadOrder() {
  loading.value = true
  error.value = ''

  try {
    order.value = await getOrder(String(route.params.id))
  } catch (loadError) {
    error.value = loadError instanceof Error ? loadError.message : 'Не удалось загрузить заказ'
  } finally {
    loading.value = false
  }
}

onMounted(loadOrder)
</script>
