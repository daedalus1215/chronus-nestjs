import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly jwtVerifier;

  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });

    const userPoolId = this.configService.get<string>('COGNITO_USER_POOL_ID');
    const clientId = this.configService.get<string>('COGNITO_CLIENT_ID');
    const tokenUse = 'id';

    this.jwtVerifier = CognitoJwtVerifier.create({
      userPoolId,
      clientId,
      tokenUse,
    });
  }

  async validate(payload: any) {
    try {
      const verifiedToken = await this.jwtVerifier.verify(payload.token);
      return verifiedToken; 
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
