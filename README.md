# Checkout Demo

Modern Vue 3 + TypeScript checkout flow with a mock Express backend.

## Requirements

- Node.js 20+
- npm 10+

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

Frontend runs on Vite and proxies `/api` to the backend on port `3000`.

## Architecture

- `src/` contains the Vue app, router, pages, and checkout calculations.
- `backend/src/` contains the mock REST API, pricing logic, and in-memory order store.

## API

- `GET /api/checkout`
- `POST /api/orders`
- `GET /api/orders/:id`

## Business logic

Final total = `base price - discount + fulfillment surcharge + payment surcharge + commission`.
Balance payment is disabled when the customer's balance is below the computed total.

