<template>
  <header class="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
      <RouterLink to="/" class="flex items-center gap-2 text-sm font-bold tracking-wide text-zinc-950" aria-label="На главную">
        <ShoppingBag class="h-5 w-5" />
        БРОКЕР
      </RouterLink>

      <nav class="hidden items-center gap-7 text-sm font-medium text-zinc-600 md:flex" aria-label="Основная навигация">
        <RouterLink class="hover:text-zinc-950" to="/">Каталог</RouterLink>
        <a class="hover:text-zinc-950" href="#orders">Заказы</a>
        <a class="hover:text-zinc-950" href="#support">Поддержка</a>
        <span class="text-zinc-950">Баланс {{ balanceLabel }}</span>
        <UserCircle class="h-5 w-5 text-zinc-500" aria-label="Профиль" />
      </nav>

      <Button class="md:hidden" variant="ghost" size="icon" aria-label="Открыть меню">
        <Menu class="h-5 w-5" />
      </Button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Menu, ShoppingBag, UserCircle } from '@lucide/vue'
import Button from '@/components/ui/Button.vue'
import { useCheckoutStore } from '@/stores/useCheckoutStore'
import { formatCurrency } from '@/utils/money'

const store = useCheckoutStore()
const balanceLabel = computed(() => formatCurrency(store.checkout?.customer.balance ?? 0, store.checkout?.customer.currency ?? 'rub'))
</script>
