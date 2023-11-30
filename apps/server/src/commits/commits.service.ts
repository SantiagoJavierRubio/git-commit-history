import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { OctokitClient } from 'src/octokit/octokitClient'
import { commitList } from './commit.entity'

@Injectable()
export class CommitsService {
  constructor(private readonly octokit: OctokitClient, private readonly configService: ConfigService) {}

  async getAllCommits() {
    const response = await this.octokit.getClient().paginate('GET /repos/{owner}/{repo}/commits', {
      owner: this.configService.get<string>('repo.owner'),
      repo: this.configService.get<string>('repo.name')
    }).catch(err => { throw new InternalServerErrorException(err) })
    const parsed = commitList.safeParse(response)
    if (parsed.success) return parsed.data
    else throw new InternalServerErrorException('Github response did not match parameters')
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
