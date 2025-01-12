import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config();

import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    logging: process.env.DB_LOGGING === 'true',
    entities: [path.resolve(__dirname, '../../**/*.entity{.ts,.js}')],
    migrations: [path.resolve(__dirname, './migrations/*{.ts,.js}')],
    migrationsTableName: 'migrations',
    migrationsRun: true,
});
