<template>
  <div :class="cn('h-px w-full bg-zinc-200', props.class)" role="separator" />
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>
