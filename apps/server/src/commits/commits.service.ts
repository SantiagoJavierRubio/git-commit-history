import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { OctokitClient } from 'src/octokit/octokitClient'

@Injectable()
export class CommitsService {
  constructor(private readonly octokit: OctokitClient, private readonly configService: ConfigService) {}

  async getAllCommits() {
    const response = await this.octokit.getClient().request('GET /repos/{owner}/{repo}/commits', {
      owner: this.configService.get<string>('repo.owner'),
      repo: this.configService.get<string>('repo.name')
    })
    return response.data
  }

  async getById(ref: string) {
    const response = await this.octokit.getClient().request('GET /repos/{owner}/{repo}/commits/{ref}', {
      owner: this.configService.get<string>('repo.owner'),
      repo: this.configService.get<string>('repo.name'),
      ref
    })
    return response.data
  }
}
