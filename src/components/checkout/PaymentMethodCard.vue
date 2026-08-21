<template>
  <label
    :class="
      cn(
        'flex cursor-pointer items-start gap-4 rounded-lg border bg-white p-4 transition-colors',
        selected ? 'border-zinc-950 ring-1 ring-zinc-950' : 'border-zinc-200 hover:border-zinc-300',
        disabled && 'cursor-not-allowed bg-zinc-50 opacity-70 hover:border-zinc-200'
      )
    "
    @click="handleSelect"
  >
    <RadioGroupItem :value="method.id" :disabled="disabled" class="mt-1" />
    <img class="mt-0.5 h-8 w-8 rounded-md border border-zinc-200 bg-white p-1" :src="method.logo" :alt="`${method.name} logo`" />
    <span class="min-w-0 flex-1">
      <span class="flex flex-wrap items-center gap-2">
        <span class="font-semibold text-zinc-950">{{ method.name }}</span>
        <Badge v-if="!method.available" variant="secondary">Недоступно</Badge>
        <Badge v-else-if="method.balancePayment" variant="success">Баланс</Badge>
      </span>
      <span class="mt-1 block text-sm text-zinc-600">{{ feeLabel }}</span>
      <span v-if="disabledReason" class="mt-2 block text-sm font-medium text-red-700">{{ disabledReason }}</span>
    </span>
    <span class="shrink-0 text-right text-sm font-bold text-zinc-950">{{ formatCurrency(total) }}</span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Badge from '@/components/ui/Badge.vue'
import RadioGroupItem from '@/components/ui/RadioGroupItem.vue'
import { cn } from '@/lib/utils'
import type { PaymentMethod } from '@/types/checkout'
import { formatCurrency } from '@/utils/money'

const props = defineProps<{
  method: PaymentMethod
  selected: boolean
  disabled: boolean
  disabledReason?: string
  total: number
}>()

const feeLabel = computed(() => {
  const commission = props.method.commissionPercent ? `Комиссия ${props.method.commissionPercent}%` : 'Без комиссии'
  const surcharge = props.method.surcharge ? `+${formatCurrency(props.method.surcharge)}` : ''
  return [commission, surcharge].filter(Boolean).join(' · ')
})

const emit = defineEmits<{
  select: [value: string]
}>()

function handleSelect() {
  if (!props.disabled) {
    emit('select', props.method.id)
  }
}
</script>
