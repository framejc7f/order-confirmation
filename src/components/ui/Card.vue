<template>
  <section :class="cn('rounded-lg border border-zinc-200 bg-white shadow-sm', props.class)">
    <slot />
  </section>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>
