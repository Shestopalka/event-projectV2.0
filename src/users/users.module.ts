import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/db/entities/users.entity';
import { HadnlersModule } from 'src/handlers/handlers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), HadnlersModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
