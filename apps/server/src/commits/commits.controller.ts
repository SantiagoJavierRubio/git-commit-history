import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags, ApiParam } from '@nestjs/swagger'
import { CommitsService } from './commits.service'

@ApiTags('commits')
@Controller('commits')
export class CommitsController {
  constructor(private readonly service: CommitsService) {}

  @Get()
  async getAll() {
    return await this.service.getAllCommits()
  }

  @ApiParam({
    name: 'ref',
    description: 'The commit reference. Can be a commit SHA, branch name, or tag name.'
  })
  @Get('/:ref')
  async getOne(@Param('ref') ref: string) {
    return await this.service.getById(ref)
  }
}
