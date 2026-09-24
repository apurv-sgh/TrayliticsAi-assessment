import assert from 'node:assert/strict'
import test from 'node:test'
import { extractJobProfile, extractResumeProfile } from '../server/services/extractionService.js'
import { compareProfiles } from '../server/services/matchingService.js'
import { calculateScore } from '../server/services/scoringService.js'
import { normalizeSkill } from '../server/services/skillCatalog.js'

test('normalizes common technology aliases without merging unrelated skills', () => {
  assert.equal(normalizeSkill('React.js'), 'React')
  assert.equal(normalizeSkill('Mongo'), 'MongoDB')
  assert.equal(normalizeSkill('Kubernetes'), 'Kubernetes')
})

test('identifies matches and missing requirements with evidence', () => {
  const resume = extractResumeProfile('Alex Morgan\nSkills\nPython, SQL, AWS, Docker, Machine Learning\nExperience\nDeployed data services using AWS EC2 and Docker. Built SQL reporting pipelines in Python.')
  const job = extractJobProfile('Required skills: Python, SQL, AWS, Docker, Kubernetes, TensorFlow')
  const comparison = compareProfiles(resume, job)
  const matched = comparison.matchedSkills.map(({ skill }) => skill)
  const missing = comparison.missingSkills.map(({ skill }) => skill)
  assert.deepEqual(matched, ['Python', 'SQL', 'AWS', 'Docker'])
  assert.deepEqual(missing, ['Kubernetes', 'TensorFlow'])
  assert.match(comparison.matchedSkills[2].evidence, /AWS/i)
  assert.match(comparison.missingSkills[0].evidence, /No explicit Kubernetes/i)
})

test('calculates a bounded deterministic score and exposes components', () => {
  const resume = extractResumeProfile('Alex\nSkills\nPython, SQL')
  const job = extractJobProfile('Required: Python, SQL, AWS')
  const comparison = compareProfiles(resume, job)
  const score = calculateScore(comparison, resume, job)
  assert.ok(score.overall >= 0 && score.overall <= 100)
  assert.equal(typeof score.components.requiredSkills, 'number')
  assert.equal(score.weights.requiredSkills, 0.55)
})
