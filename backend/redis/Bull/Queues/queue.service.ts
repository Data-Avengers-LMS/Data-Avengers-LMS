import { Queue, QueueOptions } from 'bullmq';
import { BullMqService } from '../Base/bull.base.class.js';

export class BullQueueService extends BullMqService {
  private static instance: BullQueueService | null = null;

  private queues: Map<string, Queue>;

  private constructor() {
    super();
    this.queues = new Map();
  }

  public static getInstance(): BullQueueService {
    if (!this.instance) {
      this.instance = new BullQueueService();
    }
    return this.instance;
  }

  public createQueue<TJob = any>(
    name: string,
    options?: Partial<QueueOptions>
  ): Queue<TJob> {
    if (this.queues.has(name)) {
      return this.queues.get(name) as Queue<TJob>;
    }

    const queue = new Queue<TJob>(name, {
      connection: this.connection,
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: false,
        attempts: 3,
        backoff: { type: 'exponential', delay: 5000 },
      },
      ...options,
    });

    this.queues.set(name, queue);
    return queue;
  }

  public getQueue<TJob = any>(name: string): Queue<TJob> | undefined {
    return this.queues.get(name) as Queue<TJob> | undefined;
  }

  public hasQueue(name: string): boolean {
    return this.queues.has(name);
  }

  public async closeQueue(name: string): Promise<void> {
    const queue = this.queues.get(name);
    if (queue) {
      await queue.close();
      this.queues.delete(name);
    }
  }

  public async closeAll(): Promise<void> {
    const closePromises = Array.from(this.queues.values()).map((queue) =>
      queue.close()
    );
    await Promise.all(closePromises);
    this.queues.clear();
  }

  public getActiveQueues(): string[] {
    return Array.from(this.queues.keys());
  }

  public async addJob<TJob = any>(
    queueName: string,
    jobName: string,
    data: TJob
  ) {
    const queue = this.getQueue(queueName);

    if (!queue) {
      throw new Error(
        `Queue "${queueName}" not found. Create it first using createQueue()`
      );
    }

    const job = await queue.add(jobName, data);
    return {
      id: job.id,
      name: job.name,
      queueName: job.queueName,
      data: job.data,
    };
  }
}
