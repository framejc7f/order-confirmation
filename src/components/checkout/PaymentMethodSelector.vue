<template>
  <Card class="p-5">
    <div class="mb-4">
      <h2 class="text-lg font-bold text-zinc-950">Оплата</h2>
      <p class="text-sm text-zinc-600">Итог пересчитывается для каждого способа.</p>
    </div>
    <RadioGroup :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)">
      <PaymentMethodCard
        v-for="method in methods"
        :key="method.id"
        :method="method"
        :selected="method.id === modelValue"
        :disabled="disabledMap[method.id] !== undefined"
        :disabled-reason="disabledMap[method.id]"
        :total="totals[method.id] ?? 0"
        @select="emit('update:modelValue', $event)"
      />
    </RadioGroup>
  </Card>
</template>

<script setup lang="ts">
import PaymentMethodCard from './PaymentMethodCard.vue'
import Card from '@/components/ui/Card.vue'
import RadioGroup from '@/components/ui/RadioGroup.vue'
import type { PaymentMethod } from '@/types/checkout'

defineProps<{
  methods: PaymentMethod[]
  modelValue: string
  totals: Record<string, number>
  disabledMap: Record<string, string | undefined>
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
