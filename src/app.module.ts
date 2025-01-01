import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './domain/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`, // Load the appropriate .env file
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://` +
          `${configService.get<string>('DATABASE_USER')}:` +
          `${configService.get<string>('DATABASE_PASSWORD')}@` +
          `${configService.get<string>('DATABASE_HOST')}:` +
          `${configService.get<string>('DATABASE_PORT')}/` +
          `${configService.get<string>('DATABASE_NAME')}`,
        authSource: 'admin', // Specifies the database for authentication
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
