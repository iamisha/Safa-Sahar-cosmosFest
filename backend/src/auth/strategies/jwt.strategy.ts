import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { TokenService } from 'src/token/token.service';
import { Request as RequestType } from 'express';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: configService.get('JWT_PUBLIC_KEY'),
    });
  }

  private static extractJWT(req: RequestType): string | null {
    if (req.cookies && 'jwt' in req.cookies && req.cookies.jwt.length > 0) {
      return req.cookies.jwt;
    }
  }

  async validate(payload: any, done: VerifiedCallback) {
    const tokenIdentifier: string = payload.jti;
    if (await this.tokenService.isTokenBlacklisted(tokenIdentifier)) {
      throw new UnauthorizedException('You are trying to use revoked token');
    }

    try {
      const userData = await this.userService.getOne({
        where: { id: payload.sub },
      });
      if (!userData) {
        throw new UnauthorizedException('User not found');
      }
      done(null, userData);
    } catch (err) {
      throw new UnauthorizedException('Error', err.message);
    }
  }
}
