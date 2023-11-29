import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CommitsService } from './commits.service'

@ApiTags('commits')
@Controller('commits')
export class CommitsController {
  constructor(private readonly service: CommitsService) {}
    @Get()
  async getAll() {
    return await this.service.getAllCommits()
  }
}
