import type { CreateOrderPayload } from '@/types/checkout'
import type { Order } from '@/types/order'
import { apiRequest } from './api'

export function createOrder(payload: CreateOrderPayload) {
  return apiRequest<Order>('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
}

export function getOrder(id: string) {
  return apiRequest<Order>(`/api/orders/${encodeURIComponent(id)}`)
}
