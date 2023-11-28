import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FastifyRequest } from 'fastify';

@Injectable()
export class CiscoStrategy extends PassportStrategy(Strategy, 'cisco') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    req: FastifyRequest<{
      Querystring: { api: string | string[] | undefined };
    }>,
  ): Promise<any> {
    const userAgent = req.headers['user-agent'];
    const apiKey = req.query.api;

    // Error if any bad formats are provided.
    if (!userAgent || !apiKey || Array.isArray(apiKey)) {
      throw new UnauthorizedException();
    }

    // Validate and extract MAC address from User-Agent.
    const userAgentPattern =
      /^cisco\/SPA525G2-\d\.\d\.\d([a-f])? \((?<mac>\w{12})\)$/;

    const macAddress = userAgentPattern.exec(userAgent)?.groups?.mac;

    if (!macAddress) {
      throw new UnauthorizedException();
    }

    const user = await this.authService.validateUser(macAddress, apiKey);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
