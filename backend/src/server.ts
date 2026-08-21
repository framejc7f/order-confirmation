import express from 'express'
import cors from 'cors'
import path from 'node:path'
import { checkoutRouter } from './routes/checkout.routes'
import { ordersRouter } from './routes/orders.routes'

const app = express()
app.use(cors())
app.use(express.json())

// API routes
app.use('/api/checkout', checkoutRouter)
app.use('/api/orders', ordersRouter)

// Health
app.get('/health', (_req, res) => res.json({ ok: true }))

// Serve static frontend (production)
const distPath = path.resolve(process.cwd(), 'dist')
app.use(express.static(distPath))

// SPA fallback for non-API routes to support Vue Router history mode
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path === '/health') return next()
  res.sendFile(path.join(distPath, 'index.html'))
})

const PORT = Number(process.env.PORT || 3000)
const HOST = process.env.HOST || '0.0.0.0'

app.listen(PORT, HOST, () => {
  console.log(`Mock backend running on http://${HOST}:${PORT}`)
})
