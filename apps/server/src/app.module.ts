import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CommitsModule } from './commits/commits.module'
import config from 'config/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    CommitsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
