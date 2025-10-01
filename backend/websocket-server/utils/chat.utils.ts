import { ChatEventsType } from '@repo/zod-schemas/events/events.validated.z.js';
import { BaseSocketServerClass } from '@/class/base.class.js';

export class ChatSocketService extends BaseSocketServerClass<ChatEventsType> {
  protected registerHandlers(): void {
    this.on('chat:message', (msg) => {
      console.log(`[chat] ${this.socket.id}: ${msg}`);
      this.broadcast('chat:message', msg);
    });

    this.on('chat:typing', (user) => {
      this.broadcast('chat:typing', user);
    });

    this.on('chat:join-room', (room) => {
      this.joinRoom(room);
      this.emit('chat:join-room', room);
    });

    this.on('chat:room-message', ({ room, message }) => {
      this.toRoom(room, 'chat:room-message', { room, message });
    });
  }

  protected override onConnect(): void {
    console.log(`[chat] Connected: ${this.socket.id}`);
  }

  protected onDisconnect(): void {
    console.log(`[chat] Disconnected: ${this.socket.id}`);
  }
}
