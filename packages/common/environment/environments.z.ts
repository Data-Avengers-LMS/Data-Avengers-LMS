import { createInterfacialEnvironment } from '@conf/environment.conf.js';
import { envFilePath } from '@paths/env.path.js';

export const env = createInterfacialEnvironment(envFilePath);
