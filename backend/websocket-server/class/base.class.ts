import { type Socket } from 'socket.io';
import { ISocketEvent } from '@repo/zod-schemas/types/base.zType.js';

export abstract class BaseSocketServerClass<TEvents extends ISocketEvent> {
  protected socket!: Socket;

  public init_socket(socket: Socket): void {
    this.socket = socket;
    this.onConnect?.();
    this.registerHandlers();
  }

  protected abstract registerHandlers(): void;

  protected abstract onConnect?(): void;

  protected on<K extends keyof TEvents>(
    event: K,
    // eslint-disable-next-line no-unused-vars
    handler: (payload: TEvents[K]) => void
  ): void {
    this.socket.on(event as string, handler);
  }

  protected emit<K extends keyof TEvents>(event: K, payload: TEvents[K]): void {
    this.socket.emit(event as string, payload);
  }

  protected broadcast<K extends keyof TEvents>(
    event: K,
    payload: TEvents[K]
  ): void {
    this.socket.broadcast.emit(event as string, payload);
  }

  protected toRoom<K extends keyof TEvents>(
    room: string,
    event: K,
    payload: TEvents[K]
  ): void {
    this.socket.to(room).emit(event as string, payload);
  }

  protected joinRoom(room: string): void {
    this.socket.join(room);
  }

  protected leaveRoom(room: string): void {
    this.socket.leave(room);
  }
}
