# Checkout Demo

Production-like order confirmation demo built with Vue 3, TypeScript, Vite, Tailwind CSS, shadcn-vue style components, Pinia, Vue Router, and a mock Express backend.

The app demonstrates a complete checkout flow: load checkout data, choose fulfillment and payment, recalculate totals reactively, validate balance payment on the frontend and backend, create an order, deduct balance on the backend, and load the order page directly by URL.

## Stack

- Frontend: Vue 3, TypeScript, Vite 7, Vue Router, Pinia, Tailwind CSS 4, shadcn-vue structure, Reka UI primitives, Lucide icons.
- Backend: Node.js, TypeScript, Express, in-memory mock data.

## Project Structure

- `src/pages/` - route-level checkout and order pages.
- `src/components/checkout/` - checkout product, fulfillment, payment, balance, summary, and action components.
- `src/components/ui/` - local shadcn-vue style primitives.
- `src/services/` - typed frontend API service layer.
- `src/stores/` - Pinia checkout state.
- `src/composables/` and `src/utils/` - reactive pricing and money formatting.
- `src/types/` - frontend API contracts.
- `backend/src/controllers/` - request handlers.
- `backend/src/routes/` - thin Express routes.
- `backend/src/services/` - checkout, order, pricing, and error logic.
- `backend/src/data/` - legal fictional demo data and in-memory order store.

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

This starts both services:

- Frontend: Vite dev server.
- Backend: Express mock API on `http://localhost:3000`.

You can also run them separately:

```bash
npm run dev:frontend
npm run dev:backend
```

## Verification

```bash
npm run typecheck
npm run build
```

## API Endpoints

- `GET /health` - backend health check.
- `GET /api/checkout` - product, fulfillment types, payment methods, customer balance, and defaults.
- `POST /api/orders` - creates an order from `productId`, `fulfillmentTypeId`, and `paymentMethodId`.
- `GET /api/orders/:id` - returns a full order snapshot for direct page loading.

## Pricing Formula

All money values are numbers until display formatting. The backend remains the authoritative source for totals, while the frontend only shows an instant preview based on the same shared pricing rules.

```text
discountedPrice = basePrice - discountAmount
subtotal = discountedPrice
paymentCommission = (subtotal + fulfillmentSurcharge) * commissionPercent / 100
total = subtotal + fulfillmentSurcharge + paymentCommission + paymentSurcharge
```

Frontend and backend both use `Math.round` through centralized `roundMoney()` helpers and format currency from the product's `currency` code (`rub` or `usd`). Unknown values safely fall back to `RUB`.

## Balance Payment

Balance payment is available only when the selected total is not greater than the customer balance. The frontend disables the payment card and submit action when funds are insufficient, but the backend remains the source of truth: it recalculates the total, validates availability and balance, deducts balance, creates the order, and returns `balanceAfter`.

## Demo Flow

1. Open checkout.
2. Review the demo product, discount, location, package size, and unit.
3. Change fulfillment and payment methods.
4. Watch the order summary recalculate.
5. Select balance payment when funds are sufficient.
6. Submit the order.
7. The app redirects to `/orders/:id`.
8. Refresh the order page; it loads the full order from the backend API.

## Mock Backend Limitations

This project intentionally uses an in-memory mock backend. Order data lives in process memory and resets when the backend process restarts. There is no real database, payment provider, authentication, or external integration.
