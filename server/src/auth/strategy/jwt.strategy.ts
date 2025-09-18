/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfig from 'src/auth/config/jwt.config';
import { JwtPayload } from 'src/core/dtos/auth_user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(jwtConfig.KEY)
    private JwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {
    //This tells Passport how to extract and verify the JWT token.
    if (!JwtConfiguration.secret) {
      throw new Error('JWT secret is not defined in the configuration.');
    }
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.access_token || null; // <- your cookie name
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'defaultSecret',
    });
  }
  // This is where you control what gets attached to req.user

  validate(payload: JwtPayload) {
    return { id: payload.id, role: payload.role, name: payload.name };
  }
}
