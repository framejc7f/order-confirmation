import type { CheckoutPayload } from '@/types/checkout'
import { apiRequest } from './api'

export function getCheckout() {
  return apiRequest<CheckoutPayload>('/api/checkout')
}
