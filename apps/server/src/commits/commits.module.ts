import { Module } from '@nestjs/common'
import { CommitsController } from './commits.controller'
import { CommitsService } from './commits.service'
import { OctokitClient } from 'src/octokit/octokitClient'

@Module({
  imports: [],
  controllers: [CommitsController],
  providers: [CommitsService, OctokitClient]
})

export class CommitsModule {}
