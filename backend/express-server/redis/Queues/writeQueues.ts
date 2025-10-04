import { Queue } from 'bullmq';
import { env } from '@repo/zod-schemas/environment/environments.z.js';

export const writeQueue = new Queue('write-ops', {
  connection: {
    host: env.REDIS_HOST || 'localhost',
    port: Number(env.REDIS_PORT) || 6379,
  },
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: false,
    attempts: 3,
    backoff: { type: 'exponential', delay: 5000 },
  },
});
