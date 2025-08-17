import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/db/entities/users.entity';
import { RegistrationHandler } from './authHandlers/registration.handler';
import { GetJwtToken } from './authHandlers/getJwtToken.handler';
import { JwtConfigModule } from 'src/auth/jwt/jwt.config.module';
import { LoginHandler } from './authHandlers/login.handler';
import { Events } from 'src/db/entities/events.entity';
import { EventHandler } from './eventHandlers/event.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Events]), JwtConfigModule],
  providers: [RegistrationHandler, GetJwtToken, LoginHandler, EventHandler],
  exports: [RegistrationHandler, GetJwtToken, LoginHandler, EventHandler],
})
export class HadnlersModule {}
