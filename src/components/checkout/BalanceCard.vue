<template>
  <Card class="p-5">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h2 class="text-lg font-bold text-zinc-950">Баланс</h2>
        <p class="text-sm text-zinc-600">{{ selectedBalancePayment ? balanceMessage : 'Можно использовать для оплаты заказа.' }}</p>
      </div>
      <WalletCards class="h-6 w-6 text-zinc-500" />
    </div>

    <div class="mt-4 space-y-2 text-sm">
      <div class="flex justify-between gap-4">
        <span class="text-zinc-600">Баланс</span>
        <span class="font-medium text-zinc-950">{{ formatCurrency(balance, currency) }}</span>
      </div>
      <div v-if="selectedBalancePayment" class="flex justify-between gap-4">
        <span class="text-zinc-600">К оплате</span>
        <span class="font-medium text-zinc-950">{{ formatCurrency(total, currency) }}</span>
      </div>
      <div v-if="selectedBalancePayment && canPay" class="flex justify-between gap-4">
        <span class="text-zinc-600">После оплаты</span>
        <span class="font-medium text-emerald-700">{{ formatCurrency(remainingBalance, currency) }}</span>
      </div>
      <div v-if="selectedBalancePayment && !canPay" class="flex justify-between gap-4">
        <span class="text-zinc-600">Необходимо ещё</span>
        <span class="font-medium text-red-700">{{ formatCurrency(Math.abs(remainingBalance), currency) }}</span>
      </div>
    </div>

    <Button v-if="selectedBalancePayment && !canPay" class="mt-4 w-full" variant="outline">
      Пополнить баланс
    </Button>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { WalletCards } from '@lucide/vue'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import { formatCurrency } from '@/utils/money'

const props = defineProps<{
  balance: number
  total: number
  remainingBalance: number
  currency: string
  selectedBalancePayment: boolean
  canPay: boolean
}>()

const balanceMessage = computed(() => (props.canPay ? 'Средств достаточно для оплаты.' : 'Недостаточно средств'))
</script>
