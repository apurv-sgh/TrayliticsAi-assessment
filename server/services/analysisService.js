import { extractDocumentText } from './documentParser.js'
import { extractJobProfile, extractResumeProfile } from './extractionService.js'
import { compareProfiles } from './matchingService.js'
import { calculateScore } from './scoringService.js'
import { explainComparison } from './aiService.js'

export async function analyzeResumeAgainstJob({ resumeText, roleTitle, company, jobDescription }) {
  const resumeProfile = extractResumeProfile(resumeText)
  const jobProfile = extractJobProfile(jobDescription)
  const comparison = compareProfiles(resumeProfile, jobProfile)
  const score = calculateScore(comparison, resumeProfile, jobProfile)
  const explanation = await explainComparison({ resumeProfile, jobProfile, comparison })
  const safeResumeProfile = { ...resumeProfile }
  delete safeResumeProfile.rawText
  return { roleTitle, company, jobDescription, resumeProfile: safeResumeProfile, jobProfile, comparison, score, explanation }
}

export async function analyzeUploadedResume({ file, roleTitle, company, jobDescription }) {
  const resumeText = await extractDocumentText(file)
  if (resumeText.length < 40) throw new Error('We could not find enough readable text in this resume')
  return analyzeResumeAgainstJob({ resumeText, roleTitle, company, jobDescription })
}
