import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs(
  'JwtRegister',
  (): JwtModuleOptions => ({
    secret: process.env.JWT_SECRET_TOKEN,

    signOptions: {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    },
  }),
);
