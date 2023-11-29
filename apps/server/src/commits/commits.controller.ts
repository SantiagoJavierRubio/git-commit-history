import { Controller, Get } from '@nestjs/common'
import { CommitsService } from './commits.service'

@Controller('commits')
export class CommitsController {
  constructor(private readonly service: CommitsService) {}
    @Get()
  async getAll() {
    return await this.service.getAllCommits()
  }
}
