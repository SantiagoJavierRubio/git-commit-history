import { Injectable } from '@nestjs/common'
import { Octokit } from 'octokit'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class OctokitClient {
  private client: Octokit
  constructor(private readonly configService: ConfigService) {
    this.client = new Octokit({
      auth: this.configService.get('githubToken')
    })
  }

  getClient() {
    return this.client
  }
}
