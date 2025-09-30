import http from 'http';

import { env } from '@repo/zod-schemas/environment/environments.z.js';
import { ChatSocketService } from '@utils/chat.utils.js';
import { NotificationSocketService } from '@utils/notification.utils.js';
import { SocketServer } from '@/class/websocket.server.class.js';
import { SocketServiceBuilder } from '@/class/builder.class.js';

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  console.log(
    'Shutting down the WebSocket server due to uncaught exception...'
  );
  process.exit(1);
});
const serverWs = http.createServer();

SocketServer.init(serverWs);

const builder = new SocketServiceBuilder()
  .register(new ChatSocketService())
  .register(new NotificationSocketService());

SocketServer.use((socket) => builder.build(socket));

serverWs.listen(env.WS_SERVER_PORT, () => {
  console.log(
    `WebSocket Server is running on ws://localhost:${env.WS_SERVER_PORT}`
  );
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  serverWs.close(() => {
    console.log('WebSocket Server closed due to unhandled rejection');
    process.exit(1);
  });
});
