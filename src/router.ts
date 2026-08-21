import { createRouter, createWebHistory } from 'vue-router'
import CheckoutPage from './pages/CheckoutPage.vue'
import OrderPage from './pages/OrderPage.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: CheckoutPage },
    { path: '/orders/:id', component: OrderPage, props: true }
  ]
})
