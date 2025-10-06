import { Redis } from 'ioredis';
import { env } from '@repo/zod-schemas/environment/environments.z.js';

export class RedisService {
  private static instance: RedisService;

  private client: Redis;

  private constructor() {
    this.client = new Redis({
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      retryStrategy: (times) => Math.min(times * 50, 2000),
    });

    this.client.on('connect', () => console.info(' Redis connected'));
    this.client.on('error', (err) => console.error(' Redis Error:', err));
  }

  //  Singleton instance (only one Redis connection across app)
  public static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }
    return RedisService.instance;
  }

  public async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  public async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  public async delete(key: string): Promise<void> {
    await this.client.del(key);
  }

  //  Expose raw Redis client (optional)
  public getClient(): Redis {
    return this.client;
  }
}

//  Export singleton instance
export const redisService = RedisService.getInstance();
