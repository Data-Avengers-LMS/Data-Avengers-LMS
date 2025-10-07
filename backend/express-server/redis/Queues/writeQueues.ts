import { createQueue } from '@repo/zod-schemas/queues/createqueues.js';

export const writeQueue = createQueue('write-ops');
