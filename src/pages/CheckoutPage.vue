<template>
  <main class="page">
    <section class="hero">
      <div>
        <p class="eyebrow">Mock storefront</p>
        <h1>Modern checkout flow</h1>
        <p class="lead">A responsive checkout with reactive pricing, balance validation, and backend order creation.</p>
      </div>
      <div class="hero-card">
        <div class="hero-stat"><strong>{{ checkout?.customer.balance ?? 0 }} RUB</strong><span>Current balance</span></div>
        <div class="hero-stat"><strong>{{ total }} RUB</strong><span>Selected total</span></div>
      </div>
    </section>

    <section v-if="checkout" class="checkout-grid">
      <article class="product-panel">
        <img class="product-image" :src="checkout.product.image" :alt="checkout.product.name" />
        <div>
          <h2>{{ checkout.product.name }}</h2>
          <p class="muted">{{ checkout.product.location }}</p>
          <p class="price">{{ total }} RUB</p>
          <p class="muted">Package: {{ checkout.product.packageSize }} {{ checkout.product.unit }}</p>
          <p v-if="checkout.product.hasDiscount" class="discount">Includes discount: -{{ checkout.product.discountAmount }} RUB</p>
        </div>
      </article>

      <article class="form-panel">
        <div>
          <h3>Fulfillment</h3>
          <div class="options">
            <label v-for="item in checkout.fulfillmentTypes" :key="item.id" class="option">
              <input v-model="fulfillmentTypeId" type="radio" name="fulfillment" :value="item.id" />
              <span>{{ item.name }}</span>
              <strong>{{ item.surcharge ? `+${item.surcharge} RUB` : 'Free' }}</strong>
            </label>
          </div>
        </div>

        <div>
          <h3>Payment</h3>
          <div class="options">
            <label v-for="item in checkout.paymentMethods" :key="item.id" class="option" :class="{ disabled: isBalanceDisabled(item) }">
              <input v-model="paymentMethodId" type="radio" name="payment" :value="item.id" :disabled="isBalanceDisabled(item)" />
              <span>{{ item.name }}</span>
              <strong v-if="item.balancePayment && isBalanceDisabled(item)">Need more balance</strong>
              <strong v-else>{{ paymentLabel(item) }}</strong>
            </label>
          </div>
          <p v-if="balanceWarning" class="warning">{{ balanceWarning }}</p>
        </div>

        <div class="summary">
          <div><span>Total</span><strong>{{ total }} RUB</strong></div>
          <div><span>Balance after</span><strong>{{ balanceAfter }} RUB</strong></div>
        </div>

        <button class="submit" :disabled="submitting" @click="createOrder">
          {{ submitting ? 'Creating order...' : 'Confirm order' }}
        </button>
      </article>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { CheckoutPayload, PaymentMethod } from '../../backend/src/types'
import { calcTotal, isBalanceDisabled } from '../lib/checkout'

const checkout = ref<CheckoutPayload | null>(null)
const fulfillmentTypeId = ref('')
const paymentMethodId = ref('')
const submitting = ref(false)
const router = useRouter()

const total = computed(() => {
  if (!checkout.value) return 0
  return calcTotal(checkout.value, fulfillmentTypeId.value, paymentMethodId.value)
})

const balanceAfter = computed(() => {
  if (!checkout.value) return 0
  const selected = checkout.value.paymentMethods.find((p) => p.id === paymentMethodId.value)
  return selected?.balancePayment ? checkout.value.customer.balance - total.value : checkout.value.customer.balance
})

const balanceWarning = computed(() => {
  if (!checkout.value) return ''
  const selected = checkout.value.paymentMethods.find((p) => p.id === paymentMethodId.value)
  return selected?.balancePayment && selected.available && checkout.value.customer.balance < total.value
    ? 'Balance payment is unavailable because the balance is too low.'
    : ''
})

function paymentLabel(item: PaymentMethod) {
  return item.commissionPercent ? `+${item.commissionPercent}%` : 'No fee'
}

async function loadCheckout() {
  const res = await fetch('/api/checkout')
  checkout.value = await res.json()
  fulfillmentTypeId.value = checkout.value.defaults.fulfillmentTypeId
  paymentMethodId.value = checkout.value.defaults.paymentMethodId
}

async function createOrder() {
  if (!checkout.value) return
  submitting.value = true
  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: checkout.value.product.id,
        fulfillmentTypeId: fulfillmentTypeId.value,
        paymentMethodId: paymentMethodId.value
      })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message ?? 'Order failed')
    router.push(`/orders/${data.id}`)
  } finally {
    submitting.value = false
  }
}

onMounted(loadCheckout)
</script>
