import { Socket } from 'socket.io';
import { BaseSocketServerClass } from './base.class.js';

export class SocketServiceBuilder {
  private services: BaseSocketServerClass<any>[] = [];

  public register(service: BaseSocketServerClass<any>): this {
    this.services.push(service);
    return this;
  }

  public build(socket: Socket) {
    this.services.forEach((service) => {
      service.init_socket(socket);
    });
  }
}
