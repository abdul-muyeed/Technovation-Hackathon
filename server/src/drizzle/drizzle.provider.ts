import { neon } from '@neondatabase/serverless';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'; // Adjust the path as needed
export const DRIZZLE_TOKEN = 'DRIZZLE_CONNECTION';

export const drizzleProvider = [
  {
    provide: DRIZZLE_TOKEN,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const databaseUrl = configService.get<string>('DATABASE_URL');
      const env = configService.get<string>('NODE_ENV') || 'development';
      if (!databaseUrl) {
        throw new Error(
          'DATABASE_URL is required but not provided in environment variables',
        );
      }
      try {
        // const connection = new Pool({
        //   connectionString: databaseUrl,
        // });
        // const db = drizzle({
        //   client: connection,
        // });
        // Test the connection immediately
        const connection = neon(databaseUrl);
        return drizzle(connection, {
          schema,
          logger: env == 'development' ? true : false,
        });
        // return db;
      } catch (error) {
        throw new Error(`Failed to connect to database: ${error.message}`);
      }
    },
    exports: [DRIZZLE_TOKEN],
  },
];
