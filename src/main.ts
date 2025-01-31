import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { environmentVariableValidation } from "./generic/validations/environment-variable.validation";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envVars = environmentVariableValidation();
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that do not have any decorators
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
      transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
    })
  );

  await app.listen(envVars.APP_PORT);
}
bootstrap();
