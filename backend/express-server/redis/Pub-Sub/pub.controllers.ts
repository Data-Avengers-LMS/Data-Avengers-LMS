import { Queue } from 'bullmq';
import { env } from '@repo/zod-schemas/environment/environments.z.js';

interface MessagePayload {
  [key: string]: any;
}

export class PubService {
  private queue: Queue;

  constructor() {
    this.queue = new Queue('pub-sub', {
      connection: {
        host: env.REDIS_HOST,
        port: Number(env.REDIS_PORT),
      },
    });
  }

  public async publish(
    channel: string,
    message: MessagePayload
  ): Promise<void> {
    await this.queue.add(channel, { message });
  }
}

export const pubService = new PubService();
