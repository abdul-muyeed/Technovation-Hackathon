import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { AiModule } from './ai/ai.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal:true
    }),
    AuthModule, DrizzleModule, AiModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
