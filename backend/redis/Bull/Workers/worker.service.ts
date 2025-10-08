import { BullMqService } from 'Bull/Base/bull.base.class.js';
import { Worker, Job, WorkerOptions, Processor } from 'bullmq';

export class BullWorkerService extends BullMqService {
  private static instance: BullWorkerService | null = null;

  private workers: Map<string, Worker<any, any, string>>;

  private constructor() {
    super();
    this.workers = new Map();
  }

  public static getInstance(): BullWorkerService {
    if (!this.instance) {
      this.instance = new BullWorkerService();
    }
    return this.instance;
  }

  public createWorker<TIn = any, TReturn = any, TName extends string = string>(
    name: TName,
    processor: Processor<TIn, TReturn, TName>,
    options?: Partial<WorkerOptions>
  ): Worker<TIn, TReturn, TName> {
    if (this.workers.has(name)) {
      return this.workers.get(name) as unknown as Worker<TIn, TReturn, TName>;
    }

    const worker = new Worker<TIn, TReturn, TName>(name, processor, {
      connection: this.connection,
      autorun: true,
      ...options,
    });

    BullWorkerService.registerDefaultEvents(
      worker as unknown as Worker<TIn, TReturn, string>,
      name
    );
    this.workers.set(name, worker as unknown as Worker<TIn, TReturn, string>);

    return worker;
  }

  private static registerDefaultEvents(
    worker: Worker<any, any, string>,
    name: string
  ): void {
    worker.on('completed', (job: Job) => {
      console.log(`[${name}] Job ${job.id} completed successfully`);
    });

    worker.on('failed', (job: Job | undefined, err: Error) => {
      console.error(`[${name}] Job ${job?.id} failed:`, err.message);
    });

    worker.on('error', (err: Error) => {
      console.error(`[${name}] Worker error:`, err.message);
    });

    worker.on('ready', () => {
      console.log(`[${name}] Worker is ready and waiting for jobs`);
    });
  }

  public getWorker<T = any, R = any, N extends string = string>(
    name: string
  ): Worker<T, R, N> | undefined {
    switch (this.workers.has(name)) {
      case true: {
        return this.workers.get(name) as Worker<T, R, N> | undefined;
      }
      case false: {
        console.error(`Worker with name ${name} does not exist.`);
        return undefined;
      }
      default: {
        console.error(`Worker with name ${name} does not exist.`);
        return undefined;
      }
    }
  }

  public hasWorker(name: string): boolean {
    return this.workers.has(name);
  }

  public async closeWorker(name: string): Promise<void> {
    const worker = this.workers.get(name);
    if (worker) {
      await worker.close();
      this.workers.delete(name);
    }
  }

  public async closeAll(): Promise<void> {
    const closePromises = Array.from(this.workers.values()).map((worker) =>
      worker.close()
    );
    await Promise.all(closePromises);
    this.workers.clear();
  }

  public getActiveWorkers(): string[] {
    return Array.from(this.workers.keys());
  }

  public async pauseWorker(name: string): Promise<void> {
    const worker = this.workers.get(name);
    if (worker) {
      await worker.pause();
    }
  }

  public async resumeWorker(name: string): Promise<void> {
    const worker = this.workers.get(name);
    if (worker) {
      await worker.resume();
    }
  }
}
