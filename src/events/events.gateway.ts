import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket> {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    client.join('user-1');
    console.log('connenected');
  }

  handleDisconnect(client: Socket) {
    client.leave('user-1');
    console.log('disconnected');
  }

  sendDataToRoom(roomId: string, data: any) {
    this.server.to(roomId).emit('events', data);
  }
}
