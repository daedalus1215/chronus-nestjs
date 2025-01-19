import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { logoutAction } from './app/actions/logout.action';
import { JwtStrategy } from './app/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        ConfigModule,
        PassportModule,
    ],
    providers: [JwtStrategy],
    controllers: [logoutAction],
    exports: [PassportModule],
})
export class AuthModule { }
