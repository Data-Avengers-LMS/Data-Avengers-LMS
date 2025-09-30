import { app } from '@app/app.js';
import { env } from '@repo/zod-schemas/environment/environments.z.js';

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  console.log('Shutting down the server due to uncaught exception...');
  process.exit(1);
});

const serverExpress = app.listen(env.HTTP_SERVER_PORT, () => {
  console.log(
    `Server is running on http://localhost:${env.HTTP_SERVER_PORT || 6000}`
  );
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  serverExpress.close(() => {
    console.log('Server closed due to unhandled rejection');
    process.exit(1);
  });
});
