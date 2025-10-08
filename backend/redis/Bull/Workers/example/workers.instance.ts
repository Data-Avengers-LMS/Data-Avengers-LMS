import { BullWorkerService } from '@bull-workers/worker.service.js';
import { Job } from 'bullmq';

export const workerService = BullWorkerService.getInstance();

interface WriteJobData {
  path: string;
  content: string;
  operation: 'create' | 'update' | 'delete';
}

const processWriteJob = async (job: Job<WriteJobData>) => {
  console.log(`Processing job: ${job.name}`, job.data);

  switch (job.data.operation) {
    case 'create':
      console.log(`Creating file at path: ${job.data.path}`);
      break;
    case 'update':
      console.log(`Updating file at path: ${job.data.path}`);
      break;
    case 'delete':
      console.log(`Deleting file at path: ${job.data.path}`);
      break;
    default:
      throw new Error(`Unknown operation: ${job.data.operation}`);
  }

  return { success: true, processedAt: new Date().toISOString() };
};

export const writeWorker = workerService.createWorker<WriteJobData>(
  'write-ops',
  processWriteJob,
  {
    concurrency: 5,
  }
);

const shutdown = async () => {
  console.log('Shutting down workers...');
  await workerService.closeAll();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
