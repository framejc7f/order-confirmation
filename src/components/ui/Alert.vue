<template>
  <div :class="cn('rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900', props.class)" role="alert">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>
