import { findSkills } from './skillCatalog.js'

const sectionPattern = /(?:^|\n)\s*(skills?|technical skills|experience|work experience|education|certifications?|projects?|summary|profile)\s*:?\s*(.*?)(?=\n\s*(?:skills?|technical skills|experience|work experience|education|certifications?|projects?|summary|profile)\s*:?|$)/gis
const cleanLines = (value) => value.split(/\r?\n/).map((line) => line.replace(/^[-•*\d.)\s]+/, '').trim()).filter(Boolean)

export function extractResumeProfile(text) {
  const sections = {}
  for (const match of text.matchAll(sectionPattern)) sections[match[1].toLowerCase()] = match[2].trim()
  const skills = findSkills(text)
  const email = text.match(/[\w.+-]+@[\w-]+\.[\w.-]+/)?.[0] || ''
  const phone = text.match(/(?:\+?\d[\d ()-]{8,}\d)/)?.[0]?.trim() || ''
  const firstLine = cleanLines(text)[0] || 'Candidate'
  return { name: firstLine.slice(0, 100), email, phone, summary: sections.summary || sections.profile || '', skills, experience: cleanLines(sections.experience || sections['work experience'] || ''), education: cleanLines(sections.education || ''), certifications: cleanLines(sections.certifications || ''), projects: cleanLines(sections.projects || ''), rawText: text.slice(0, 50000) }
}

export function extractJobProfile(text) {
  const skills = findSkills(text)
  const lines = cleanLines(text)
  const preferredSkills = skills.filter(({ name }) => new RegExp(`(?:preferred|nice to have|bonus|plus|desired)[^\\n]{0,140}${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i').test(text))
  const requiredSkills = skills.filter((skill) => !preferredSkills.some(({ name }) => name === skill.name))
  const experienceRequirements = lines.filter((line) => /\b(?:years?|experience|senior|junior|lead)\b/i.test(line)).slice(0, 8)
  const educationRequirements = lines.filter((line) => /\b(?:degree|bachelor|master|phd|education)\b/i.test(line)).slice(0, 5)
  return { requiredSkills, preferredSkills, experienceRequirements, educationRequirements, responsibilities: lines.filter((line) => /\b(?:build|develop|design|lead|work|manage|create|own|partner)\b/i.test(line)).slice(0, 12), keywords: skills.map(({ name }) => name) }
}
