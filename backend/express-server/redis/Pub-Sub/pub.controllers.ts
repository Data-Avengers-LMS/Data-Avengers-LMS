import { Queue } from 'bullmq';
import { env } from '@repo/zod-schemas/environment/environments.z.js';

interface MessagePayload {
  [key: string]: any;
}

export class PubService {
  public readonly channelName: string;

  private queue: Queue;

  public constructor(channelName: string = 'pub-sub') {
    this.channelName = channelName;
    this.queue = new Queue(this.channelName, {
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

  public async close(): Promise<void> {
    await this.queue.close();
  }
}

// Initialize with default channel name
export const pubService = new PubService();
