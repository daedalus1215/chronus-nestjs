import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { logoutAction } from './app/actions/logout.action';
import { JwtStrategy } from './app/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { LogUserIn } from './app/actions/log-user-in.action';
import { AuthService } from './domain/services/auth.service';
import { UserAggregator } from 'src/users/domain/aggregators/user.aggregator';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        UsersModule,
        ConfigModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'default_secret',
            signOptions: { expiresIn: '1h' }, 
        }),
    ],
    providers: [JwtStrategy, AuthService, UserAggregator],
    controllers: [logoutAction, LogUserIn],
    exports: [PassportModule, AuthService, JwtModule],
})
export class AuthModule { }
