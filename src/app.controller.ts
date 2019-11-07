import { Get, Controller, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { EventsGateway } from './events/events.gateway';

// @ApiBearerAuth()
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  @Get('/')
  root() {
    this.eventsGateway.sendDataToRoom({roomId: 'USER-16', event: 'notify', data: {message: 'hello'}});
    return this.appService.root();
  }
}
