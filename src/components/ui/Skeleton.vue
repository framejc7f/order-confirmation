<template>
  <div :class="cn('animate-pulse rounded-md bg-zinc-200', props.class)" />
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>
