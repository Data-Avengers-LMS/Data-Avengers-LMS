import { NotificationEventsType } from '@repo/zod-schemas/events/events.validated.z.js';
import { BaseSocketServerClass } from '@/class/base.class.js';

export class NotificationSocketService extends BaseSocketServerClass<NotificationEventsType> {
  protected registerHandlers(): void {
    this.on('notification:subscribe', (userId) => {
      this.joinRoom(`notifications:${userId}`);
      console.log(
        `[notifications] ${this.socket.id} subscribed to user ${userId}`
      );
    });

    this.on('notification:test', (userId) => {
      this.toRoom(`notifications:${userId}`, 'notification:new', {
        title: 'Test Notification',
        message: `Hello user ${userId}!`,
      });
    });
  }

  protected onConnect(): void {
    console.log(`[notifications] Connected: ${this.socket.id}`);
  }

  protected onDisconnect(): void {
    console.log(`[notifications] Disconnected: ${this.socket.id}`);
  }
}
