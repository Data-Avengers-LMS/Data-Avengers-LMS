import { env } from '@env/environments.z.js';

export const redisConnectionObject = {
  host: env.REDIS_HOST,
  port: Number(env.REDIS_PORT),
};
