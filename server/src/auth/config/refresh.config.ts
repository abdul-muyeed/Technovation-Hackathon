import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export default registerAs(
  'RefreshJwtRegister',
  (): JwtSignOptions => ({
    secret: process.env.JWT_REFRESH_TOKEN,
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  }),
);
