import { Server as IOServer, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';

type SocketHandler = (
  // eslint-disable-next-line no-unused-vars
  socket: Socket
) => void;

export class SocketServer {
  private static instance: SocketServer;

  private io: IOServer;

  private handlers: SocketHandler[] = [];

  private constructor(httpServer: HttpServer) {
    this.io = new IOServer(httpServer, {
      path: '/dashboard/socket.io',
      allowRequest: (req, callback) => {
        const isAllowed = req.url?.startsWith('/dashboard') ?? false;
        callback(null, isAllowed);
      },
    });

    this.io.on('connection', (socket: Socket) => {
      console.log(`Socket connected: ${socket.id}`);
      this.handlers.forEach((handler) => handler(socket));
    });
  }

  public static init(httpServer: HttpServer): SocketServer {
    if (!SocketServer.instance) {
      SocketServer.instance = new SocketServer(httpServer);
    }
    return SocketServer.instance;
  }

  public static use(handler: SocketHandler): void {
    if (!SocketServer.instance) {
      throw new Error('SocketServer not initialized');
    }
    SocketServer.instance.handlers.push(handler);
  }

  public static getIO(): IOServer {
    if (!SocketServer.instance) {
      throw new Error('SocketServer not initialized');
    }
    return SocketServer.instance.io;
  }
}
