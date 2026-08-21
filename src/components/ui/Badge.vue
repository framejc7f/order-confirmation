<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva('inline-flex items-center rounded-md px-2 py-1 text-xs font-medium', {
  variants: {
    variant: {
      default: 'bg-zinc-950 text-white',
      secondary: 'bg-zinc-100 text-zinc-700',
      success: 'bg-emerald-50 text-emerald-700',
      warning: 'bg-amber-50 text-amber-700'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

type BadgeProps = {
  variant?: 'default' | 'secondary' | 'success' | 'warning'
  class?: string
}

const props = defineProps<BadgeProps>()
const badgeClasses = computed(() => cn(badgeVariants({ variant: props.variant }), props.class))
</script>
