import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(macAddress: string, api: string) {
    const user = await this.userService.findByMacAddress(macAddress);

    if (!user || user.apiKey !== api) {
      return null;
    }

    return { userId: user.userId };
  }

  async createJwt(user: User) {
    const payload = { sub: user.userId };
    return this.jwtService.signAsync(payload);
  }

  async setCookie(req: FastifyRequest & { user: User }, res: FastifyReply) {
    if (req.cookies.jwt && (await this.isTokenValid(req.cookies.jwt))) {
      return;
    }

    const jwt = await this.createJwt(req.user);
    res.setCookie('jwt', jwt, { path: '/', httpOnly: true });
  }

  async isTokenValid(token: string) {
    try {
      const jwt = await this.jwtService.verifyAsync(token);
      const currentTime = Math.floor(Date.now() / 1000);

      // Tokens are not considered valid if they are due to expire in 10 mins time.
      if (currentTime >= jwt.exp - 600) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}
