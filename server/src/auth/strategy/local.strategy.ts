import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-local';
import { Role } from 'src/core/enum';
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
    const role = req.body.role;
    if (!role) {
      // console.log('loginType is required');
      throw new BadRequestException('Invalid credential');
    }
    // check if role is valid
    if (![Role.ADMIN, Role.USER, Role.USER, Role.MODERATOR].includes(role)) {
      throw new BadRequestException('Invalide credentail');
    }
    // validate the user credentials

    const user = await this.authService.validateUser({
      username,
      password,
      role,
    });

    return user;
  }
}
