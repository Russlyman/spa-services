import { JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: JwtStrategy.extractJwtFromCookies,
      ignoreExpiration: false,
      secretOrKey: 'test',
    });
  }

  static extractJwtFromCookies: JwtFromRequestFunction = (req) => {
    if (!req.cookies.jwt) {
      return null;
    }

    return req.cookies.jwt;
  };

  async validate(payload: any) {
    return { userId: payload.sub };
  }
}
