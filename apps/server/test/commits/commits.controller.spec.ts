import { CommitsController } from '../../src/commits/commits.controller'
import { OctokitClient } from '../../src/octokit/octokitClient'
import { ConfigService } from '@nestjs/config'
import { CommitsService } from '../../src/commits/commits.service'
import { commitListMock } from './__mocks__/commits.mocks'

describe('Commits controller', () => {
  let octokit: OctokitClient
  let configService: ConfigService
  let commitsController: CommitsController
  let commitsService: CommitsService

  beforeEach(() => {
    configService = new ConfigService()
    octokit = new OctokitClient(configService)
    commitsService = new CommitsService(octokit, configService)
    commitsController = new CommitsController(commitsService)
  })

  describe('getAll', () => {
    it('Should return array of commits', async () => {
      jest.spyOn(commitsService, 'getAllCommits').mockImplementation(async () => commitListMock)
      expect((await commitsController.getAll())).toBe(commitListMock)
    })
  })
})
