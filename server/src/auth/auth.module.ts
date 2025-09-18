import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { drizzleProvider } from 'src/drizzle/drizzle.provider';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import jwtConfig from './config/jwt.config';
import RefreshJwtConfig from './config/refresh.config';
import { JwtStrategy, LocalStrategy, RefreshJwtStrategy } from './strategy';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jwtConfig, RefreshJwtConfig],
    }),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    JwtModule.registerAsync(RefreshJwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    ...drizzleProvider,
  ],
})
export class AuthModule {}
