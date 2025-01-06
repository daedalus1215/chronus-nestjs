import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module"; // Import UsersModule
import { AuthModule } from "./auth/auth.module"; // Import AuthModule if required
import { AppController } from "./app/app.controller";
import { AppService } from "./domain/app.service";
import { HealthModule } from "./health/health.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || "development"}`, // Use appropriate .env file
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DB_HOST") || "localhost",
        port: configService.get<number>("DB_PORT") || 5432,
        username: configService.get<string>("DATABASE_USER") || "admin",
        password:
          configService.get<string>("DATABASE_PASSWORD") || "adminpassword",
        database: configService.get<string>("DATABASE_NAME") || "chronus",
        entities: [__dirname + "/**/*.entity{.ts,.js}"], // Automatically load entities
        synchronize: true, // For development; disable in production
      }),
      inject: [ConfigService],
    }),
    UsersModule, // Add UsersModule
    AuthModule, // Include AuthModule if needed
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
