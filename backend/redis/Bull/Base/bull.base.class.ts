import type { ConnectionOptions } from 'bullmq';
import { redisConnectionObject } from '@repo/zod-schemas/constants/redis.constant.js';

export abstract class BullMqService {
  protected readonly connection: ConnectionOptions;

  protected constructor() {
    this.connection = redisConnectionObject;
  }
}
