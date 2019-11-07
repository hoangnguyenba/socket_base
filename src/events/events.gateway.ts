import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket> {

  constructor(private readonly jwtService: JwtService) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    try {
      const user = await this.jwtService.verify(client.handshake.query.token);
      client.join(`USER-${user.id}`);
      Logger.log(`USER-${user.id} connected`);
    } catch (error) {
      client.disconnect(true);
    }
  }

  async handleDisconnect(client: Socket) {
    try {
      const user = await this.jwtService.verify(client.handshake.query.token);
      client.leave(`USER-${user.id}`);
      Logger.log(`USER-${user.id} disconnected`);
    } catch (error) {}
  }

  sendDataToRoom(params: {roomId: string, event: string, data: any}) {
    const { roomId, event, data }  = params;
    this.server.to(roomId).emit(event, data);
  }
}
