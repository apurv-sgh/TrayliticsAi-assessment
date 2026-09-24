import mongoose from 'mongoose'

const analysisSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  resume: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume' },
  roleTitle: { type: String, required: true, trim: true, maxlength: 160 },
  company: { type: String, trim: true, maxlength: 120 },
  resumeName: { type: String, required: true, trim: true },
  jobDescription: { type: String, required: true, maxlength: 30000 },
  score: { type: Number, min: 0, max: 100, required: true },
  scoreComponents: { type: mongoose.Schema.Types.Mixed, default: {} },
  scoreWeights: { type: mongoose.Schema.Types.Mixed, default: {} },
  resumeProfile: { type: mongoose.Schema.Types.Mixed, default: {} },
  jobProfile: { type: mongoose.Schema.Types.Mixed, default: {} },
  matchedSkills: [{ skill: String, status: String, evidence: String }],
  missingSkills: [{ skill: String, status: String, evidence: String }],
  partialMatches: [{ skill: String, status: String, evidence: String }],
  relatedSkills: [{ type: String, trim: true }],
  explanation: { type: String, default: '' },
  recommendations: [{ skill: String, priority: String, suggestion: String }],
  status: { type: String, enum: ['queued', 'complete', 'failed'], default: 'complete', index: true },
}, { timestamps: true })
analysisSchema.index({ user: 1, createdAt: -1 })
export default mongoose.model('Analysis', analysisSchema)
