<template>
  <Card class="overflow-hidden">
    <div class="grid gap-5 p-5 sm:grid-cols-[160px_1fr]">
      <div class="flex aspect-square items-center justify-center rounded-lg bg-zinc-50 p-4">
        <img class="h-full w-full object-contain" :src="product.image" :alt="product.name" />
      </div>

      <div class="min-w-0 space-y-4">
        <div class="space-y-2">
          <Badge v-if="product.hasDiscount" variant="warning">Скидка {{ product.discountPercent }}%</Badge>
          <h1 class="text-2xl font-bold leading-tight text-zinc-950">{{ product.name }}</h1>
          <div class="flex flex-wrap gap-3 text-sm text-zinc-600">
            <span class="inline-flex items-center gap-1.5">
              <MapPin class="h-4 w-4" />
              {{ product.location }}
            </span>
            <span class="inline-flex items-center gap-1.5">
              <Package class="h-4 w-4" />
              {{ product.packageSize }} {{ product.unit }}
            </span>
          </div>
        </div>

        <div class="space-y-2 rounded-lg bg-zinc-50 p-4 text-sm">
          <div class="flex items-center justify-between gap-4">
            <span class="text-zinc-600">Цена товара</span>
            <span class="font-medium text-zinc-950">{{ formatCurrency(product.basePrice, product.currency) }}</span>
          </div>
          <div v-if="product.hasDiscount" class="flex items-center justify-between gap-4">
            <span class="text-zinc-600">Скидка {{ product.discountPercent }}%</span>
            <span class="font-medium text-emerald-700">−{{ formatCurrency(product.discountAmount, product.currency) }}</span>
          </div>
          <div class="flex items-center justify-between gap-4 pt-2 text-base">
            <span class="font-semibold text-zinc-950">Цена после скидки</span>
            <span class="font-bold text-zinc-950">{{ formatCurrency(discountedPrice, product.currency) }}</span>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MapPin, Package } from '@lucide/vue'
import Badge from '@/components/ui/Badge.vue'
import Card from '@/components/ui/Card.vue'
import type { Product } from '@/types/checkout'
import { formatCurrency } from '@/utils/money'

const props = defineProps<{ product: Product }>()
const discountedPrice = computed(() => props.product.basePrice - (props.product.hasDiscount ? props.product.discountAmount : 0))
</script>
