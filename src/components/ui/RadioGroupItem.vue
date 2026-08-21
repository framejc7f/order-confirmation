<template>
  <RekaRadioGroupItem
    :value="value"
    :disabled="disabled"
    :class="
      cn(
        'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        props.class
      )
    "
  >
    <RadioGroupIndicator class="h-2.5 w-2.5 rounded-full bg-current" />
  </RekaRadioGroupItem>
</template>

<script setup lang="ts">
import { RadioGroupIndicator, RadioGroupItem as RekaRadioGroupItem } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<{
  value: string
  disabled?: boolean
  class?: string
}>()
</script>
