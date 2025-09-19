import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      passReqToCallback: true,
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(req: Request, username: string, password: string) {
    const user = await this.authService.validateUser({
      username,
      password,
    });

    return user;
  }
}
