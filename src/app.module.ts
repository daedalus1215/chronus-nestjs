// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module'; // Import UsersModule
import { AuthModule } from './auth/auth.module'; // Import AuthModule if required
import { AppController } from './app/app.controller';
import { AppService } from './domain/app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, // Use appropriate .env file
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService) => ({
        type: 'sqlite',
        database: 'db.sqlite',  // Path to your SQLite database file
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // Automatically load entities
        synchronize: true, // For development; disable in production
      }),
      inject: [ConfigService],
    }),
    UsersModule, // Add UsersModule
    AuthModule, // Include AuthModule if needed
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
