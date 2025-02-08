import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./domain/users.service";
import { UsersController } from "./app/controllers/users.controller";
import { User } from "./domain/entities/user.entity"; // Adjust import based on your new entity
import { UserAggregator } from "./domain/aggregators/user.aggregator";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  exports: [UserAggregator],
  providers: [UsersService, UserAggregator],
})
export class UsersModule {}
