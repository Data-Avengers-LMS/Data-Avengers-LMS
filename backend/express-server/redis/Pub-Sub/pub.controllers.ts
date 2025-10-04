import { Queue } from 'bullmq';
import { env } from '@repo/zod-schemas/environment/environments.z.js';

export const pubQueue = new Queue('pub-sub', {
  connection: {
    host: env.REDIS_HOST,
    port: Number(env.REDIS_PORT),
  },
});

export const publishMessage = async (channel: string, message: any) => {
  await pubQueue.add(channel, { message });
  console.log(`📤 Published to ${channel}:`, message);
};
