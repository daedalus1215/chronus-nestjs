import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { environmentVariableValidation } from "./generic/validations/environment-variable.validation";
import { HttpExceptionFilter } from "./shared-kernel/app/exceptions/filter/http-exception.filter";

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

  app.useGlobalFilters(new HttpExceptionFilter());
  
  await app.listen(envVars.APP_PORT);
}
bootstrap();
