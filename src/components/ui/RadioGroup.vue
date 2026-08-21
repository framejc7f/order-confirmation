<template>
  <RadioGroupRoot
    :model-value="modelValue"
    :class="cn('grid gap-3', props.class)"
    @update:model-value="emit('update:modelValue', String($event))"
  >
    <slot />
  </RadioGroupRoot>
</template>

<script setup lang="ts">
import { RadioGroupRoot } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<{
  modelValue: string
  class?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
