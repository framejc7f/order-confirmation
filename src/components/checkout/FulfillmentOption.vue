<template>
  <label
    :class="
      cn(
        'flex cursor-pointer items-center gap-4 rounded-lg border bg-white p-4 transition-colors',
        selected ? 'border-zinc-950 ring-1 ring-zinc-950' : 'border-zinc-200 hover:border-zinc-300'
      )
    "
    @click="emit('select', option.id)"
  >
    <RadioGroupItem :value="option.id" />
    <span class="min-w-0 flex-1">
      <span class="block font-semibold text-zinc-950">{{ option.name }}</span>
      <span class="block text-sm text-zinc-600">{{ option.surcharge ? `+${formatCurrency(option.surcharge)}` : 'Без доплаты' }}</span>
    </span>
  </label>
</template>

<script setup lang="ts">
import RadioGroupItem from '@/components/ui/RadioGroupItem.vue'
import { cn } from '@/lib/utils'
import type { FulfillmentType } from '@/types/checkout'
import { formatCurrency } from '@/utils/money'

defineProps<{
  option: FulfillmentType
  selected: boolean
}>()

const emit = defineEmits<{
  select: [value: string]
}>()
</script>
