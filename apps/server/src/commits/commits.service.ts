import { Injectable } from '@nestjs/common'
import { OctokitClient } from 'src/octokit/octokitClient'

@Injectable()
export class CommitsService {
  constructor(private readonly octokit: OctokitClient) {}
  async getAllCommits() {
    return this.octokit.getClient().request('GET /repos/{owner}/{repo}/commits', {
      owner: 'SantiagoJavierRubio',
      repo: 'git-commit-history'
    })
  }
}
