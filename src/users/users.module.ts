import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./domain/users.service";
import { UsersController } from "./app/controllers/users.controller";
import { User } from "./domain/entities/user.entity"; // Adjust import based on your new entity

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Import the User entity
  ],
  controllers: [UsersController],
  exports: [UsersService],
  providers: [UsersService],
})
export class UsersModule {}
