import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participants } from 'src/db/entities/participants.entity';
import { Repository } from 'typeorm';
import { RegistrationInEventDto } from './dto/registration-event.dto';
import { EventService } from '../event.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participants)
    private readonly participantsRepository: Repository<Participants>,
    private readonly eventsService: EventService,
    private readonly userService: UsersService,
  ) {}

  async registrationInEvent(registrationInEventDto: RegistrationInEventDto) {
    try {
      const existEvent = await this.eventsService.getEvent(
        registrationInEventDto.name,
      );
      const user = await this.userService.getUser(registrationInEventDto.user);
      const isParticipants = await this.participantsRepository.findOne({
        where: {
          user: user,
        },
      });
      if (isParticipants)
        throw new BadRequestException('You already added this event');
      const participants = await this.participantsRepository.find({
        where: {
          event: existEvent,
        },
      });
      console.log('lalalal', participants);

      if (participants.length > existEvent.maxParticipants)
        throw new BadRequestException('Lox');
      if (!existEvent) throw new BadGatewayException('Event not found');
      const addParticipant = await this.participantsRepository.create({
        event: existEvent,
        user: user,
      });
      await this.participantsRepository.save(addParticipant);
    } catch (err) {
      throw err;
    }
  }
}
