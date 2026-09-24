const defaultWeights = { requiredSkills: 0.55, preferredSkills: 0.15, experienceAlignment: 0.15, keywordCoverage: 0.1, educationAlignment: 0.05 }

function getWeights() {
  try { return { ...defaultWeights, ...JSON.parse(process.env.SCORING_WEIGHTS_JSON || '{}') } } catch { return defaultWeights }
}

export function calculateScore(comparison, resumeProfile, jobProfile) {
  const weights = getWeights()
  const requiredTotal = jobProfile.requiredSkills.length || 1
  const preferredTotal = jobProfile.preferredSkills.length || 1
  const requiredScore = (comparison.matchedSkills.filter(({ skill }) => jobProfile.requiredSkills.some((item) => item.name === skill)).length + comparison.partialMatches.length * 0.5) / requiredTotal
  const preferredScore = comparison.matchedSkills.filter(({ skill }) => jobProfile.preferredSkills.some((item) => item.name === skill)).length / preferredTotal
  const experienceScore = jobProfile.experienceRequirements.length === 0 ? 1 : Math.min(1, resumeProfile.experience.length / jobProfile.experienceRequirements.length)
  const keywordScore = Math.min(1, resumeProfile.skills.length / Math.max(jobProfile.keywords.length, 1))
  const educationScore = jobProfile.educationRequirements.length === 0 ? 1 : resumeProfile.education.length > 0 ? 1 : 0
  const components = { requiredSkills: Math.round(Math.max(0, Math.min(1, requiredScore)) * 100), preferredSkills: Math.round(Math.max(0, Math.min(1, preferredScore)) * 100), experienceAlignment: Math.round(experienceScore * 100), keywordCoverage: Math.round(keywordScore * 100), educationAlignment: Math.round(educationScore * 100) }
  const overall = Math.round(Object.entries(components).reduce((sum, [key, value]) => sum + value * weights[key], 0))
  return { overall, components, weights }
}
