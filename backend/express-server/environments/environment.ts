import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';
import dotenv from 'dotenv';
import { envFilePath } from '@constants/env.path.js';

dotenv.config({ path: envFilePath });

export const env = createEnv({
  server: {
    PORT: z.string().min(4).max(4),
  },
  clientPrefix: 'CLIENT',
  client: {
    CLIENT_ORIGIN: z.url(),
  },
  runtimeEnv: process.env,
});
