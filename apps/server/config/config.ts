import { z } from 'zod'

function validatePossiblyEmptyString(input: string, defaultVal: string) {
  const parsed = z.string().min(1).safeParse(input)
  return parsed.success ? parsed.data : defaultVal
}

export default () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  githubToken: process.env.GITHUB_TOKEN,
  repo: {
    owner: validatePossiblyEmptyString(process.env.REPO_OWNER, 'SantiagoJavierRubio'),
    name: validatePossiblyEmptyString(process.env.REPO_NAME, 'git-commit-history')
  },
  PORT: process.env.SERVER_PORT
})
