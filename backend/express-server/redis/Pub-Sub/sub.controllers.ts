import { Worker, Job } from 'bullmq';
import { env } from '@repo/zod-schemas/environment/environments.z.js';

interface UserCreatedMessage {
  id: string;
  name: string;
}

interface NotificationMessage {
  title: string;
  body: string;
}

type PubSubMessage = UserCreatedMessage | NotificationMessage;

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
    message: PubSubMessage
  ): Promise<void> {
    switch (channel) {
      case 'user:created': {
        const user = message as UserCreatedMessage;
        console.log('User Created Event:', user.id, user.name);
        break;
      }

      case 'notification': {
        const notif = message as NotificationMessage;
        console.log('Notification Event:', notif.title, notif.body);
        break;
      }
      default:
        console.log('Unknown channel:', channel);
        break;
    }
  }
}

export const subService = new SubService();
