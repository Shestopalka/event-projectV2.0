import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Events } from 'src/db/entities/events.entity';
import { EventDto } from 'src/events/dto/event.dto';
import { IHandle } from 'src/interfaces/handler.interface';
import { IDto } from 'src/types/dto.type';
import { Repository } from 'typeorm';

@Injectable()
export class EventHandler implements IHandle<EventDto, void> {
  constructor(
    @InjectRepository(Events)
    private readonly eventsRepository: Repository<Events>,
  ) {}
  async handle(dto: EventDto): Promise<void> {
    try {
      const existEvent = await this.eventsRepository.findOne({
        where: {
          name: dto.name,
        },
      });
      if (existEvent)
        throw new BadRequestException('This name for event already in use');
    } catch (err) {}
  }
}
