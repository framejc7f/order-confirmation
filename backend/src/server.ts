import express from 'express'
import cors from 'cors'
import { checkoutRouter } from './routes/checkout.routes'
import { ordersRouter } from './routes/orders.routes'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/checkout', checkoutRouter)
app.use('/api/orders', ordersRouter)

app.get('/health', (_req, res) => res.json({ ok: true }))

app.listen(3000, () => {
  console.log('Mock backend running on http://localhost:3000')
})
