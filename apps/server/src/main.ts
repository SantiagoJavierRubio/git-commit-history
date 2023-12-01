import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger/dist";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = app.get(ConfigService);
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Git commit history API")
    .setVersion("1.0")
    .addTag("commits")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("", app, document);
  await app.listen(config.get("PORT"));
}
bootstrap();
