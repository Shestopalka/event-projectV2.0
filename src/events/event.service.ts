import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Events } from 'src/db/entities/events.entity';
import { Repository } from 'typeorm';
import { EventDto } from './dto/event.dto';
import { EventHandler } from 'src/handlers/eventHandlers/event.handler';
import { EditingEventDto } from './dto/editing-event.dto';
import { DeleteEventDto } from './dto/delete-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Events)
    private readonly eventsRepository: Repository<Events>,
    private readonly eventHandler: EventHandler,
  ) {}

  async createEvent(eventDto: EventDto) {
    try {
      await this.eventHandler.handle(eventDto);

      const regEvent = this.eventsRepository.create({
        name: eventDto.name,
        description: eventDto.description,
        location: eventDto.location,
        date: eventDto.date,
        maxParticipants: eventDto.maxParticipants,
        user: { id: eventDto.user?.userId },
      });
      await this.eventsRepository.save(regEvent);
      return { message: 'Event created successfuly!' };
    } catch (err) {
      throw err;
    }
  }
  async getEvent(eventName: string) {
    try {
      console.log('this name Event:', eventName);

      const existEvent = await this.eventsRepository.findOne({
        where: {
          name: eventName,
        },
      });
      if (!existEvent) throw new BadRequestException('Event not found');
      console.log(existEvent);

      return existEvent;
    } catch (err) {
      throw err;
    }
  }

  async updateEvent(editingEventDto: EditingEventDto) {
    try {
      const existEvent = await this.eventsRepository.findOne({
        where: {
          name: editingEventDto.name,
          user: { id: editingEventDto.user?.userId },
        },
      });
      if (!existEvent) throw new BadRequestException('Event not found');
      const { ...updatedData } = editingEventDto.updateData;
      await this.eventsRepository.update(
        {
          id: existEvent.id,
        },
        { ...updatedData },
      );
    } catch (err) {
      throw err;
    }
  }
  async deleteEvent(deleteEventDto: DeleteEventDto) {
    try {
      const existEvent = await this.eventsRepository.findOne({
        where: {
          name: deleteEventDto.name,
          user: { id: deleteEventDto.user },
        },
      });
      if (!existEvent) throw new BadRequestException('Event not found');

      await this.eventsRepository.delete(existEvent.id);
    } catch (err) {
      throw err;
    }
  }
}
