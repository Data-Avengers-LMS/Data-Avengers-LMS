import { Worker } from 'bullmq';
import { env } from '@repo/zod-schemas/environment/environments.z.js';

const subWorker = new Worker(
  'pub-sub',
  async (job) => {
    console.log(
      `📥 Received message from channel ${job.name}:`,
      job.data.message
    );
    // handle message logic here
  },
  {
    connection: {
      host: env.REDIS_HOST,
      port: Number(env.REDIS_PORT),
    },
    concurrency: 5,
  }
);

subWorker.on('completed', (job) =>
  console.log(`Message processed from ${job.name}`)
);

subWorker.on('failed', (job, err) =>
  console.error(`Message failed from ${job?.name}:`, err)
);
