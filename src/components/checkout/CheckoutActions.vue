<template>
  <Card class="p-5">
    <Alert v-if="error" class="mb-4">{{ error }}</Alert>
    <Button class="w-full" :disabled="disabled || submitting" @click="emit('submit')">
      <Loader2 v-if="submitting" class="h-4 w-4 animate-spin" />
      {{ label }}
    </Button>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Loader2 } from '@lucide/vue'
import Alert from '@/components/ui/Alert.vue'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import { formatCurrency } from '@/utils/money'

const props = defineProps<{
  total: number
  balancePayment: boolean
  submitting: boolean
  disabled: boolean
  error: string
}>()

const emit = defineEmits<{
  submit: []
}>()

const label = computed(() => {
  if (props.submitting) return 'Оформление...'
  return props.balancePayment ? `Оплатить с баланса · ${formatCurrency(props.total)}` : `Оплатить ${formatCurrency(props.total)}`
})
</script>
