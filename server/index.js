import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
dotenv.config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { connectDatabase } from './config/db.js'
import authRoutes from './routes/auth.js'
import analysisRoutes from './routes/analyses.js'
import analyzeRoutes from './routes/analyze.js'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, { cors: { origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true } })
app.set('io', io)
app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }))
app.use(express.json({ limit: '2mb' }))
app.use(cookieParser())
const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 120, standardHeaders: 'draft-8', legacyHeaders: false })
app.use('/api', apiLimiter)
app.get('/api/health', (req, res) => res.json({ ok: true, service: 'careerlens-api' }))
app.use('/api/auth', authRoutes)
app.use('/api/analyses', analysisRoutes)
app.use('/api/analyze', analyzeRoutes)
app.use((error, req, res, _next) => { console.error(error); res.status(error.status || 500).json({ message: error.code === 11000 ? 'Email already exists' : 'Something went wrong' }) })
io.on('connection', (socket) => { socket.on('workspace:join', (userId) => socket.join(userId)) })
const port = process.env.PORT || 4000
connectDatabase().then(() => httpServer.listen(port, () => console.log(`CareerLens API listening on ${port}`))).catch((error) => { console.error('Database startup failed', error); process.exit(1) })
