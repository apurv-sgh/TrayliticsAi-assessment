import { Router } from 'express'
import Analysis from '../models/Analysis.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)

router.get('/', async (req, res, next) => {
  try {
    const { search = '', status, sort = '-createdAt' } = req.query
    const filter = { user: req.userId }
    if (status) filter.status = status
    if (search) {
      const escapedSearch = String(search).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      filter.$or = [{ roleTitle: new RegExp(escapedSearch, 'i') }, { company: new RegExp(escapedSearch, 'i') }]
    }
    const safeSort = ['createdAt', '-createdAt', 'score', '-score'].includes(sort) ? sort : '-createdAt'
    res.json({ analyses: await Analysis.find(filter).sort(safeSort).limit(50) })
  } catch (error) { next(error) }
})

router.get('/metrics', async (req, res, next) => {
  try {
    const [total, average] = await Promise.all([Analysis.countDocuments({ user: req.userId }), Analysis.aggregate([{ $match: { user: req.userId, status: 'complete' } }, { $group: { _id: null, average: { $avg: '$score' } } }])])
    res.json({ total, averageScore: Math.round(average[0]?.average || 0) })
  } catch (error) { next(error) }
})

router.get('/:id', async (req, res, next) => {
  try {
    const analysis = await Analysis.findOne({ _id: req.params.id, user: req.userId })
    if (!analysis) return res.status(404).json({ message: 'Analysis not found' })
    res.json({ analysis })
  } catch (error) { next(error) }
})

router.delete('/:id', async (req, res, next) => {
  try { await Analysis.deleteOne({ _id: req.params.id, user: req.userId }); res.status(204).end() } catch (error) { next(error) }
})
export default router
