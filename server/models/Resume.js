import mongoose from 'mongoose'

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  filename: { type: String, required: true, trim: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true, max: 5 * 1024 * 1024 },
  extracted: { type: mongoose.Schema.Types.Mixed, required: true },
}, { timestamps: true })
resumeSchema.index({ user: 1, createdAt: -1 })
export default mongoose.model('Resume', resumeSchema)
