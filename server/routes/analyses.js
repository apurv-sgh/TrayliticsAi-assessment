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
    if (search) filter.$or = [{ roleTitle: new RegExp(search, 'i') }, { company: new RegExp(search, 'i') }]
    res.json({ analyses: await Analysis.find(filter).sort(sort).limit(50) })
  } catch (error) { next(error) }
})

router.post('/', async (req, res, next) => {
  try {
    const { roleTitle, company, resumeName, jobDescription, score = 0, matchedSkills = [], missingSkills = [] } = req.body
    if (!roleTitle || !resumeName || !jobDescription) return res.status(400).json({ message: 'Role title, resume, and job description are required' })
    const analysis = await Analysis.create({ user: req.userId, roleTitle, company, resumeName, jobDescription, score, matchedSkills, missingSkills })
    req.app.get('io')?.to(req.userId).emit('analysis:created', analysis)
    res.status(201).json({ analysis })
  } catch (error) { next(error) }
})

router.get('/metrics', async (req, res, next) => {
  try {
    const [total, average] = await Promise.all([Analysis.countDocuments({ user: req.userId }), Analysis.aggregate([{ $match: { user: req.userId, status: 'complete' } }, { $group: { _id: null, average: { $avg: '$score' } } }])])
    res.json({ total, averageScore: Math.round(average[0]?.average || 0) })
  } catch (error) { next(error) }
})
export default router
