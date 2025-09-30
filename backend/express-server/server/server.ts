import http from 'http';
import { app } from '@app/app.js';

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  console.log('Shutting down the server due to uncaught exception...');
  process.exit(1);
});

const server = http.createServer(app);

server.listen(9000, () => {
  console.log('Server is running on http://localhost:3000');
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => {
    console.log('Server closed due to unhandled rejection');
    process.exit(1);
  });
});
