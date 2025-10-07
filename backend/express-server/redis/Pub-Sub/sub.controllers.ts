import { Worker, Job } from 'bullmq';
import { env } from '@repo/zod-schemas/environment/environments.z.js';

export class SubService {
  private worker: Worker;

  public readonly channelName: string;

  public constructor(channelName: string = 'pub-sub', concurrency?: number) {
    this.channelName = channelName;
    this.worker = new Worker(
      this.channelName,
      async (job: Job) => {
        await SubService.handleMessage(job.name, job.data.message);
      },
      {
        connection: {
          host: env.REDIS_HOST,
          port: Number(env.REDIS_PORT),
        },
        concurrency: concurrency ?? env.WORKER_CONCURRENCY,
      }
    );

    this.worker.on('completed', (job) =>
      console.log(` Message processed from ${job.name}`)
    );

    this.worker.on('failed', (job, err) =>
      console.error(`Message failed from ${job?.name}:`, err)
    );
  }

  private static async handleMessage(
    channel: string,
    message: any
  ): Promise<void> {
    switch (channel) {
      case 'user:created':
        console.log(' User Created Event:', message);
        break;

      case 'notification':
        console.log('Notification Event:', message);
        break;

      default:
        console.log('Unknown channel:', channel);
        break;
    }
  }
}

export const subService = new SubService();
