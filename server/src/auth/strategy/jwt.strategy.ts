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
    private jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {
    // Validate JWT secret exists
    if (!jwtConfiguration.secret) {
      throw new Error('JWT secret is not defined in the configuration.');
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Extract from cookie first
        (req: Request) => {
          // Debug log
          const token = req?.cookies?.access_token || null;
          return token;
        },
        // Fallback to Authorization header
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      // FIXED: Use the injected configuration instead of process.env directly
      secretOrKey: jwtConfiguration.secret,
      // Add these options for better debugging
      passReqToCallback: false,
    });
  }

  // This is where you control what gets attached to req.user
  async validate(payload: JwtPayload) {
    // Validate payload structure
    if (!payload.id || !payload.role) {
      throw new Error('Invalid JWT payload structure');
    }

    return {
      id: payload.id,
      role: payload.role,
      name: payload.name,
    };
  }
}
