import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantsController } from './participants.controller';
import { ParticipantsService } from './participants.service';
import { EventModule } from '../event.module';
import { UsersModule } from 'src/users/users.module';
import { Participants } from 'src/db/entities/participants.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Participants]), EventModule, UsersModule],
  controllers: [ParticipantsController],
  providers: [ParticipantsService],
})
export class ParticipantsModule {}
