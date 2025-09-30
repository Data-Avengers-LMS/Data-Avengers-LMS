import path, { join } from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const secretsPath = join(dirname, '../../secrets');

// eslint-disable-next-line
let envFilePath: string;

switch (process.env.NODE_ENV) {
  case 'production':
    envFilePath = join(secretsPath, '.env');
    break;

  case 'development':
    envFilePath = join(secretsPath, '.env.local');
    break;

  default:
    envFilePath = join(secretsPath, '.env.local');
    break;
}

export { envFilePath };
