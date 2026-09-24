import mongoose from 'mongoose'

const analysisSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  roleTitle: { type: String, required: true, trim: true, maxlength: 160 },
  company: { type: String, trim: true, maxlength: 120 },
  resumeName: { type: String, required: true, trim: true },
  jobDescription: { type: String, required: true, maxlength: 30000 },
  score: { type: Number, min: 0, max: 100, required: true },
  matchedSkills: [{ type: String, trim: true }],
  missingSkills: [{ type: String, trim: true }],
  status: { type: String, enum: ['queued', 'complete', 'failed'], default: 'complete', index: true },
}, { timestamps: true })
analysisSchema.index({ user: 1, createdAt: -1 })
export default mongoose.model('Analysis', analysisSchema)
