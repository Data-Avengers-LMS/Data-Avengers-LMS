import { Worker, Job } from 'bullmq';
import { env } from '@repo/zod-schemas/environment/environments.z.js';

export class WriteWorker {
  private worker: Worker;

  constructor() {
    this.worker = new Worker('write-ops', WriteWorker.processJob, {
      connection: {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
      },
    });

    this.registerEvents();
  }

  private static async processJob(job: Job) {
    console.log(`📌 Processing job: ${job.name}`, job.data);

    if (job.name === 'create-file') {
      console.log(`📝 Creating file at path: ${job.data.path}`);
    }
  }

  private registerEvents() {
    this.worker.on('completed', (job) =>
      console.log(`Job ${job.id} completed`)
    );

    this.worker.on('failed', (job, err) =>
      console.error(`Job ${job?.id} failed:`, err)
    );
  }
}
