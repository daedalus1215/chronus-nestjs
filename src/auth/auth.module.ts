import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { logoutAction } from './app/actions/logout.action';
import { JwtStrategy } from './app/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { LogUserIn } from './app/actions/log-user-in.action';
import { AuthService } from './domain/services/auth.service';

@Module({
    imports: [
        ConfigModule,
        PassportModule,
    ],
    providers: [JwtStrategy, AuthService],
    controllers: [logoutAction, LogUserIn],
    exports: [PassportModule],
})
export class AuthModule { }
