import { Injectable, Get } from '@nestjs/common';

import {
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@Injectable()
export class AppService {

  constructor() {}

  root() {
    return { message: 'ok'};
  }
}