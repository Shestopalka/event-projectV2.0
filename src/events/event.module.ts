import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events } from 'src/db/entities/events.entity';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { HadnlersModule } from 'src/handlers/handlers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Events]), HadnlersModule],
  providers: [EventService],
  controllers: [EventController],
  exports: [EventService],
})
export class EventModule {}
