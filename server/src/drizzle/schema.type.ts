import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';

export type Database = NeonHttpDatabase<typeof schema>;
