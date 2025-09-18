import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { drizzleProvider } from './drizzle.provider';

@Module({
  imports: [ConfigModule],
  providers: [...drizzleProvider],
})
export class DrizzleModule {}
