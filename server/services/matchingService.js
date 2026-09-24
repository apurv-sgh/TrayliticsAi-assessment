import { getSkill } from './skillCatalog.js'

function findEvidence(text, skill) {
  const sentences = text.split(/(?<=[.!?])\s+|\n+/).map((sentence) => sentence.trim()).filter(Boolean)
  const catalogEntry = getSkill(skill)
  return sentences.find((sentence) => {
    const normalizedSentence = ` ${sentence.toLowerCase().replace(/[.,:;\-_/()+]+/g, ' ').replace(/\s+/g, ' ').trim()} `
    return catalogEntry?.aliases.some((alias) => normalizedSentence.includes(` ${alias.toLowerCase().replace(/[.,:;\-_/()+]+/g, ' ').replace(/\s+/g, ' ').trim()} `))
  }) || ''
}

export function compareProfiles(resumeProfile, jobProfile) {
  const resumeNames = new Set(resumeProfile.skills.map(({ name }) => name))
  const allRequired = jobProfile.requiredSkills.map(({ name }) => name)
  const allPreferred = jobProfile.preferredSkills.map(({ name }) => name)
  const matchedSkills = []
  const missingSkills = []
  const partialMatches = []
  for (const skill of allRequired) {
    if (resumeNames.has(skill)) matchedSkills.push({ skill, status: 'matched', evidence: findEvidence(resumeProfile.rawText, skill) || `${skill} is listed in the resume skills.` })
    else {
      const evidence = findEvidence(resumeProfile.rawText, skill)
      if (evidence) partialMatches.push({ skill, status: 'partial', evidence })
      else missingSkills.push({ skill, status: 'missing', evidence: `No explicit ${skill} evidence was detected in the resume.` })
    }
  }
  const preferredMatches = allPreferred.filter((skill) => resumeNames.has(skill)).map((skill) => ({ skill, status: 'matched', evidence: findEvidence(resumeProfile.rawText, skill) || `${skill} is listed in the resume skills.` }))
  const relatedSkills = resumeProfile.skills.filter(({ name }) => !allRequired.includes(name) && !allPreferred.includes(name)).map(({ name }) => name)
  return { matchedSkills: [...matchedSkills, ...preferredMatches], missingSkills, partialMatches, relatedSkills }
}
