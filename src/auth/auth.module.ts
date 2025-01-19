import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './app/actions/logout.action';
import { JwtStrategy } from './app/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        ConfigModule,
        PassportModule,
    ],
    providers: [JwtStrategy],
    controllers: [AuthController],
    exports: [PassportModule],
})
export class AuthModule { }
