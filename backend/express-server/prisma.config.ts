import path from 'node:path';
import type { PrismaConfig } from 'prisma';
import 'dotenv/config';

export default {
  schema: path.join('database', 'prisma'),
} satisfies PrismaConfig;
