<template>
  <main class="page">
    <section class="order-card" v-if="order">
      <p class="eyebrow">Order created</p>
      <h1>Order #{{ order.id }}</h1>
      <p>{{ order.productName }}</p>
      <div class="summary">
        <div><span>Total</span><strong>{{ order.total }} RUB</strong></div>
        <div><span>Balance after</span><strong>{{ order.balanceAfter }} RUB</strong></div>
      </div>
      <RouterLink class="submit" to="/">Back to checkout</RouterLink>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import type { Order } from '../../backend/src/types'

const route = useRoute()
const order = ref<Order | null>(null)

onMounted(async () => {
  const res = await fetch(`/api/orders/${route.params.id}`)
  order.value = await res.json()
})
</script>
