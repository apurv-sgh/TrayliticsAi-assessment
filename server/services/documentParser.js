import path from 'node:path'
import { PDFParse } from 'pdf-parse'
import mammoth from 'mammoth'

export const MAX_RESUME_BYTES = 5 * 1024 * 1024
export const SUPPORTED_RESUME_TYPES = new Set(['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])

export async function extractDocumentText(file) {
  if (!file?.buffer?.length) throw new Error('The uploaded resume is empty')
  if (file.size > MAX_RESUME_BYTES) throw new Error('Resume must be smaller than 5 MB')
  if (!SUPPORTED_RESUME_TYPES.has(file.mimetype)) throw new Error('Only PDF and DOCX resumes are supported')
  const extension = path.extname(file.originalname).toLowerCase()
  if (extension === '.pdf') {
    const parser = new PDFParse({ data: file.buffer })
    try { const result = await parser.getText(); return result.text.trim() } finally { await parser.destroy() }
  }
  const result = await mammoth.extractRawText({ buffer: file.buffer })
  return result.value.trim()
}
