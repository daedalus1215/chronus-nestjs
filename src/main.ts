import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppDataSource } from './typeorm/data-source';
import { register } from 'tsconfig-paths';

register({
  baseUrl: './dist',
  paths: {
    'src/*': ['./dist/src/*'],
  },
});

async function bootstrap() {
  await AppDataSource.initialize();

  const app = await NestFactory.create(AppModule);
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // Temporary log

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strip properties that do not have any decorators
    forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
    transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
  }));

  await AppDataSource.runMigrations();
  await app.listen(process.env.APP_PORT, '0.0.0.0');
}
bootstrap();
