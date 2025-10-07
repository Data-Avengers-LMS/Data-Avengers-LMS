import { Queue, QueueOptions } from 'bullmq';
import { env } from '@env/environments.z.js';

export const createQueue = (name: string, options?: Partial<QueueOptions>) =>
  new Queue(name, {
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
    ...options,
  });
