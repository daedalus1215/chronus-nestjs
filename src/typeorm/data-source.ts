import { DataSource } from 'typeorm';
import { User } from '../users/domain/entities/user.entity';

const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [User],
    migrations: ['src/typeorm/migrations/*.ts'],
    synchronize: false,
    logging: true
});

module.exports = AppDataSource; 