export default () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  githubToken: process.env.GITHUB_TOKEN,
  repo: {
    owner: process.env.REPO_OWNER ?? 'SantiagoJavierRubio',
    name: process.env.REPO_NAME ?? 'git-commit-history'
  }
})
