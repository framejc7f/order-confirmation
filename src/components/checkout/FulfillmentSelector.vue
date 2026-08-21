<template>
  <Card class="p-5">
    <div class="mb-4">
      <h2 class="text-lg font-bold text-zinc-950">Получение</h2>
      <p class="text-sm text-zinc-600">Выберите удобный вариант доставки или выдачи.</p>
    </div>
    <RadioGroup :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)">
      <FulfillmentOption
        v-for="option in options"
        :key="option.id"
        :option="option"
        :selected="option.id === modelValue"
        @select="emit('update:modelValue', $event)"
      />
    </RadioGroup>
  </Card>
</template>

<script setup lang="ts">
import FulfillmentOption from './FulfillmentOption.vue'
import Card from '@/components/ui/Card.vue'
import RadioGroup from '@/components/ui/RadioGroup.vue'
import type { FulfillmentType } from '@/types/checkout'

defineProps<{
  options: FulfillmentType[]
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
