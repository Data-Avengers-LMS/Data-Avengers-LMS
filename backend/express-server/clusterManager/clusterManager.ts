import cluster from 'cluster';
import { availableParallelism } from 'os';
import { serverExpress } from '../server/server.js';

const totalCPUs = availableParallelism();

if (cluster.isPrimary) {
  for (let i = 0; i < totalCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', () => {
    cluster.fork();
  });
} else {
  serverExpress();
}
