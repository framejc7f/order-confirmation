export function roundMoney(value: number) {
  return Math.round(value)
}

export function formatCurrency(value: number, currency = 'RUB') {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(roundMoney(value))
}
