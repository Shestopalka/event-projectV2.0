import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Users } from 'src/db/entities/users.entity';
import { RegistrationHandler } from './registration.handler';
import { JwtService } from '@nestjs/jwt';
import { GetJwtToken } from './getJwtToken.handler';
import { JwtConfigModule } from 'src/auth/jwt/jwt.config.module';
import { LoginHandler } from './login.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), JwtConfigModule],
  providers: [RegistrationHandler, GetJwtToken, LoginHandler],
  exports: [RegistrationHandler, GetJwtToken, LoginHandler],
})
export class HadnlersModule {}
