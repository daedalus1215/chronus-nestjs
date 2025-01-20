import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module'; 
import { AuthModule } from './auth/auth.module'; 
import { AppService } from './shared-kernel/domain/app.service';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      // validationSchema: Joi.object({
      //   COGNITO_USER_POOL_ID: Joi.string().required(),
      //   COGNITO_CLIENT_ID: Joi.string().required(),
      //   COGNITO_REGION: Joi.string().required(),
      //   COGNITO_ISSUER: Joi.string().required(),
      //   APP_PORT: Joi.number().required(),
      //   NODE_ENV: Joi.string().required(),
      //   DATABASE: Joi.string().required(),
      //   DATABASE_TYPE: Joi.string().required(),
      //   JWT_SECRET: Joi.string().required(),
      // }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService:ConfigService) => ({
        type: configService.get<string>('DATABASE_TYPE') as 'postgres' | 'mysql',
        database: configService.get<string>('DATABASE'), 
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, 
        migrationsRun: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule, 
    HealthModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
