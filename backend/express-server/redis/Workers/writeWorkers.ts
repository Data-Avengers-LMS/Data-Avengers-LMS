import { Worker } from 'bullmq';
import { env } from '@repo/zod-schemas/environment/environments.z.js';

const worker = new Worker(
  'write-ops',
  async (job) => {
    console.log(`📌 Processing job: ${job.name}`, job.data);

    // Example: Write file, send email, or DB ops
    if (job.name === 'create-file') {
      // TODO: your logic here
      console.log(`Creating file: ${job.data.path}`);
    }
  },
  {
    connection: {
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
    },
  }
);

worker.on('completed', (job) => console.log(` Job ${job.id} completed`));

worker.on('failed', (job, err) => console.error(`Job ${job?.id} failed:`, err));
