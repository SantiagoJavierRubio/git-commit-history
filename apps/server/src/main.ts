import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger/dist'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Git commit history API')
    .setVersion('1.0')
    .addTag('commits')
    .build()
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('', app, document)
  await app.listen(3000)
}
bootstrap()
