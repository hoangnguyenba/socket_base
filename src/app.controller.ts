import { Get, Controller, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { ApiBearerAuth } from '@nestjs/swagger';
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
  // @UseGuards(AuthGuard())
  root() {
    this.eventsGateway.sendDataToRoom('user-1', {m: 'hello'});
    return this.appService.root();
  }
}
