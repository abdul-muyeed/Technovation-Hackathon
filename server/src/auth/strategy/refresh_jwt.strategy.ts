import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from 'passport-jwt';
import { RefreshTokenPayload } from 'src/core/dtos/auth_user.dto';
import { AuthService } from '../auth.service';
import refresh_jwtConfig from '../config/refresh.config';

// extract the payload from the JWT token
// and validate it
@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    @Inject(refresh_jwtConfig.KEY)
    private refreshConfig: ConfigType<typeof refresh_jwtConfig>,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: refreshConfig.secret,
      // Passport not to accept expired JWT tokens.
      ignoreExpiration: false,
      passReqToCallback: true,
    } as StrategyOptionsWithRequest);
  }
  validate(req: Request, payload: any): Promise<RefreshTokenPayload | void> {
    const refreshToken = req.get('authorization')?.replace('Bearer', '').trim();
    // console.log(refreshToken);
    const p = {
      user_id: payload.id,
      role: payload.role,
      session_id: payload.session_id,
    };
    return this.authService.validateRefreshToken(p, refreshToken!);
  }
}
