import { createEnv } from '@t3-oss/env-core';
import dotenv from 'dotenv';
import { z } from 'zod';

const createInterfacialEnvironment = (path: string) => {
  dotenv.config({ path });
  return createEnv({
    server: {
      HTTP_SERVER_PORT: z
        .string()
        .min(4, 'Port must be at least 4 characters long')
        .max(4, 'Port must be at most 5 characters long')
        .regex(/^\d+$/, 'Port must be a number')
        .transform(Number),
      WS_SERVER_PORT: z
        .string()
        .min(4, 'Port must be at least 4 characters long')
        .max(4, 'Port must be at most 5 characters long')
        .regex(/^\d+$/, 'Port must be a number')
        .transform(Number),
      REDIS_HOST: z
        .string()
        .min(1, 'Redis host is required')
        .default('localhost'),
      REDIS_PORT: z
        .string()
        .regex(/^\d+$/, 'Port must be a number')
        .transform(Number)
        .default(6379),
      WORKER_CONCURRENCY: z
        .string()
        .regex(/^\d+$/, 'Worker concurrency must be a number')
        .transform(Number)
        .default(5),
    },
    clientPrefix: 'CLIENT',
    client: {
      CLIENT_ORIGIN: z.url('Invalid URL').default('http://localhost:3000'),
    },
    runtimeEnv: process.env,
  });
};

export { createInterfacialEnvironment };
