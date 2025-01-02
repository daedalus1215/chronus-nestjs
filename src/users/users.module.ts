import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './domain/users.service';
import { UsersController } from './app/controllers/users.controller';
import { User } from './infra/user.entity';  // Adjust import based on your new entity
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Import the User entity
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'sqlite',
        database: 'db.sqlite',  // Path to your SQLite database file
        entities: [User],  // Include the User entity
        synchronize: true, // Set to true to auto-create tables (in dev only)
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UsersController],
  exports: [UsersService],
  providers: [UsersService],
})
export class UsersModule {}
