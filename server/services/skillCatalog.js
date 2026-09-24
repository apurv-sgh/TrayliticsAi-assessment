const catalog = [
  { name: 'JavaScript', aliases: ['javascript', 'js', 'ecmascript'], category: 'Frontend' },
  { name: 'TypeScript', aliases: ['typescript', 'ts'], category: 'Frontend' },
  { name: 'React', aliases: ['react', 'react.js', 'reactjs'], category: 'Frontend' },
  { name: 'Vue', aliases: ['vue', 'vue.js', 'vuejs'], category: 'Frontend' },
  { name: 'Angular', aliases: ['angular', 'angular.js'], category: 'Frontend' },
  { name: 'Node.js', aliases: ['node', 'node.js', 'nodejs'], category: 'Backend' },
  { name: 'Express', aliases: ['express', 'express.js', 'expressjs'], category: 'Backend' },
  { name: 'Python', aliases: ['python'], category: 'Backend' },
  { name: 'Java', aliases: ['java'], category: 'Backend' },
  { name: 'C#', aliases: ['c#', 'csharp', '.net', 'dotnet'], category: 'Backend' },
  { name: 'SQL', aliases: ['sql', 'structured query language'], category: 'Database' },
  { name: 'MongoDB', aliases: ['mongodb', 'mongo db', 'mongo'], category: 'Database' },
  { name: 'PostgreSQL', aliases: ['postgresql', 'postgres', 'postgre'], category: 'Database' },
  { name: 'MySQL', aliases: ['mysql'], category: 'Database' },
  { name: 'Redis', aliases: ['redis'], category: 'Database' },
  { name: 'AWS', aliases: ['aws', 'amazon web services'], category: 'Cloud' },
  { name: 'Azure', aliases: ['azure', 'microsoft azure'], category: 'Cloud' },
  { name: 'GCP', aliases: ['gcp', 'google cloud', 'google cloud platform'], category: 'Cloud' },
  { name: 'Docker', aliases: ['docker', 'containerization', 'containers'], category: 'DevOps' },
  { name: 'Kubernetes', aliases: ['kubernetes', 'k8s'], category: 'DevOps' },
  { name: 'Terraform', aliases: ['terraform'], category: 'DevOps' },
  { name: 'Git', aliases: ['git', 'github', 'gitlab'], category: 'Tools' },
  { name: 'TensorFlow', aliases: ['tensorflow'], category: 'AI/ML' },
  { name: 'PyTorch', aliases: ['pytorch'], category: 'AI/ML' },
  { name: 'Machine Learning', aliases: ['machine learning', 'ml'], category: 'AI/ML' },
  { name: 'REST APIs', aliases: ['rest api', 'rest apis', 'restful api', 'restful apis'], category: 'Backend' },
  { name: 'GraphQL', aliases: ['graphql'], category: 'Backend' },
  { name: 'Figma', aliases: ['figma'], category: 'Design' },
  { name: 'Product strategy', aliases: ['product strategy'], category: 'Product' },
  { name: 'User research', aliases: ['user research', 'user interviews'], category: 'Product' },
]

const normalizedText = (value) => ` ${value.toLowerCase().replace(/[.,:;\-_/()+]+/g, ' ').replace(/\s+/g, ' ').trim()} `
const aliasesBySpecificity = () => catalog.flatMap((skill) => skill.aliases.map((alias) => ({ skill, alias: normalizedText(alias).trim() }))).sort((left, right) => right.alias.length - left.alias.length)

export function normalizeSkill(value) {
  const input = normalizedText(value)
  const found = aliasesBySpecificity().find(({ alias }) => input.includes(` ${alias} `))
  return found?.skill.name || value.trim()
}

export function findSkills(text) {
  const input = normalizedText(text)
  return catalog.filter((skill) => skill.aliases.some((alias) => input.includes(` ${normalizedText(alias).trim()} `))).map(({ name, category }) => ({ name, category }))
}

export function getSkill(name) { return catalog.find((skill) => skill.name === name) }
export { catalog }
