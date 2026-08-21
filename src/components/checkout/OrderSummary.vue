<template>
  <Card class="p-5">
    <h2 class="text-lg font-bold text-zinc-950">Итого</h2>

    <div class="mt-4 space-y-3 text-sm">
      <div class="flex justify-between gap-4">
        <span class="text-zinc-600">Стоимость товара</span>
        <span class="font-medium text-zinc-950">{{ formatCurrency(productPrice) }}</span>
      </div>
      <div v-if="discountAmount" class="flex justify-between gap-4">
        <span class="text-zinc-600">Скидка</span>
        <span class="font-medium text-emerald-700">−{{ formatCurrency(discountAmount) }}</span>
      </div>
      <div v-if="fulfillmentSurcharge" class="flex justify-between gap-4">
        <span class="text-zinc-600">Получение</span>
        <span class="font-medium text-zinc-950">+{{ formatCurrency(fulfillmentSurcharge) }}</span>
      </div>
      <div v-if="paymentCommission" class="flex justify-between gap-4">
        <span class="text-zinc-600">Комиссия</span>
        <span class="font-medium text-zinc-950">+{{ formatCurrency(paymentCommission) }}</span>
      </div>
      <div v-if="paymentSurcharge" class="flex justify-between gap-4">
        <span class="text-zinc-600">Доплата</span>
        <span class="font-medium text-zinc-950">+{{ formatCurrency(paymentSurcharge) }}</span>
      </div>
    </div>

    <Separator class="my-4" />

    <div class="flex items-end justify-between gap-4">
      <span class="text-sm font-medium text-zinc-600">Итого к оплате</span>
      <span class="text-3xl font-bold tracking-tight text-zinc-950">{{ formatCurrency(total) }}</span>
    </div>

    <div v-if="showBalance" class="mt-4 rounded-lg bg-zinc-50 p-4 text-sm">
      <div class="flex justify-between gap-4">
        <span class="text-zinc-600">Баланс</span>
        <span class="font-medium text-zinc-950">{{ formatCurrency(balance) }}</span>
      </div>
      <div class="mt-2 flex justify-between gap-4">
        <span class="text-zinc-600">После оплаты</span>
        <span :class="remainingBalance >= 0 ? 'font-medium text-emerald-700' : 'font-medium text-red-700'">
          {{ formatCurrency(remainingBalance) }}
        </span>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card from '@/components/ui/Card.vue'
import Separator from '@/components/ui/Separator.vue'
import { formatCurrency } from '@/utils/money'

defineProps<{
  productPrice: number
  discountAmount: number
  fulfillmentSurcharge: number
  paymentCommission: number
  paymentSurcharge: number
  total: number
  showBalance: boolean
  balance: number
  remainingBalance: number
}>()
</script>
