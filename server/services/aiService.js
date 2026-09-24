import { GoogleGenerativeAI } from '@google/generative-ai'

function deterministicRecommendations(comparison) {
  return comparison.missingSkills.slice(0, 5).map(({ skill }) => ({ skill, priority: 'High', suggestion: `Add truthful ${skill} evidence if you have it, or prioritize a small hands-on project to build familiarity.` }))
}

export async function explainComparison({ resumeProfile, jobProfile, comparison }) {
  const fallback = { summary: `${comparison.matchedSkills.length} requirement(s) have explicit resume evidence. ${comparison.missingSkills.length} requirement(s) were not clearly found.`, recommendations: deterministicRecommendations(comparison) }
  if (!process.env.GEMINI_API_KEY) return fallback
  try {
    const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = client.getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-1.5-flash' })
    const prompt = `Return JSON only with keys summary and recommendations. Do not invent facts. Resume skills: ${JSON.stringify(resumeProfile.skills)}. Job requirements: ${JSON.stringify(jobProfile)}. Comparison: ${JSON.stringify(comparison)}. Recommendations must be truthful and actionable.`
    const result = await model.generateContent(prompt)
    const raw = result.response.text().replace(/^```json\s*|\s*```$/g, '').trim()
    const parsed = JSON.parse(raw)
    return { summary: typeof parsed.summary === 'string' ? parsed.summary : fallback.summary, recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations.slice(0, 8) : fallback.recommendations }
  } catch { return fallback }
}
