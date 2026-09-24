import { z } from 'zod'

export const analysisInputSchema = z.object({
  roleTitle: z.string().trim().min(2).max(160),
  company: z.string().trim().max(120).optional().default(''),
  jobDescription: z.string().trim().min(40).max(30000),
})
