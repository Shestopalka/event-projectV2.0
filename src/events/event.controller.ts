import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { EditingEventDto } from './dto/editing-event.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { EventDto } from './dto/event.dto';
import { DeleteEventDto } from './dto/delete-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventsService: EventService) {}

  @UseGuards(JwtAuthGuard)
  @Get('getEvent')
  async getEvent(@Body() body) {
    const { name } = body;
    return await this.eventsService.getEvent(name);
  }

  @UseGuards(JwtAuthGuard)
  @Post('register')
  async createEvent(@GetUser() user, @Body() dto: EventDto) {
    dto.user = user;
    return this.eventsService.createEvent(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  async updateEvent(@GetUser() user, @Body() dto: EditingEventDto) {
    dto.user = user;
    await this.eventsService.updateEvent(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async deleteEvent(@GetUser() user, @Body() dto: DeleteEventDto) {
    dto.user = user.userId;
    console.log(dto);

    await this.eventsService.deleteEvent(dto);
  }
}
