import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { AiModule } from './ai/ai.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, DrizzleModule, AiModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
