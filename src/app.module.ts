import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from "./users/users.module"; // Import UsersModule
import { AuthModule } from "./auth/auth.module"; // Import AuthModule if required
import { AppController } from "./app/app.controller";
import { AppService } from "./domain/app.service";
import { HealthModule } from "./health/health.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as Joi from "joi";
import { User } from "./users/domain/entities/user.entity";
import { Note } from "./notes/infra/schemas/notes/note.entity";
import { Memo } from "./notes/infra/schemas/notes/memo.entity";
import { Tag } from "./notes/infra/schemas/tag/tag.entity";
import { TagNote } from "./notes/infra/schemas/tag/tag-note.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Note, Memo, Tag, TagNote]),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB _PORT"),
        username: configService.get<string>("DATABASE_USER"),
        password: configService.get<string>("DATABASE_PASSWORD"),
        database: configService.get<string>("DATABASE_NAME"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: false,
        migrationsRun: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
