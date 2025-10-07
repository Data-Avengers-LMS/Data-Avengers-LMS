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
    console.log(`Processing job: ${job.name}`, job.data);

    if (job.name === 'create-file') {
      console.log(` Creating file at path: ${job.data.path}`);
    }
  }

  private registerEvents() {
    this.worker.on('completed', (job) =>
      console.log(`Job ${job.id} completed`)
    );

    this.worker.on('failed', (job, err) =>
      console.error(` Job ${job?.id} failed:`, err)
    );
  }

  // Add public method for cleanup inside the class
  public async close(): Promise<void> {
    if (this.worker) {
      await this.worker.close();
    }
  }
}

const runWorker = async () => {
  const worker = new WriteWorker();
  console.log(' Worker started and waiting for jobs...');

  // Handle process termination
  const shutdown = async () => {
    console.log(' Shutting down worker...');
    await worker.close();
    process.exit(0);
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
};

runWorker().catch((error) => {
  console.error(' Worker error:', error);
  process.exit(1);
});
