import { app } from '@app/app.js';
import { env } from '@repo/zod-schemas/environment/environments.z.js';
import { fileURLToPath } from 'url';

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  console.log('Shutting down the server due to uncaught exception...');
  process.exit(1);
});

let server: ReturnType<typeof app.listen>;

export function serverExpress() {
  server = app.listen(env.HTTP_SERVER_PORT, () => {
    console.log(
      `Server is running on http://localhost:${env.HTTP_SERVER_PORT || 6000}`
    );
  });
  return server;
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  serverExpress();
}

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  if (server) {
    server.close(() => {
      console.log('Server closed due to unhandled rejection');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
