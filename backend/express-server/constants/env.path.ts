import path, { join } from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const projectRoot = join(dirname, '../..');

// eslint-disable-next-line
let envFilePath: string;

switch (process.env.NODE_ENV) {
  case 'production':
    envFilePath = join(projectRoot, './secrets/.env');
    break;

  case 'development':
    envFilePath = join(projectRoot, './secrets/.env.local');
    break;
  default:
    // Default to development env file if NODE_ENV is not set
    envFilePath = join(projectRoot, './secrets/.env.local');
    break;
}

export { envFilePath };
