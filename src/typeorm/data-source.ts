import * as dotenv from "dotenv";
import { User } from "src/users/domain/entities/user.entity";
dotenv.config();
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const AppDataSource = new DataSource({
  type: "sqlite", // Specify SQLite as the database type
  database: process.env.DATABASE || "database.sqlite", // Path to the SQLite database file
  entities: [User, __dirname + "/../**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/migrations/*{.ts,.js}"], // Path to migration files
  synchronize: false, // Always false in production
  migrationsRun: true, // Automatically run migrations on app start
  namingStrategy: new SnakeNamingStrategy(),
});
