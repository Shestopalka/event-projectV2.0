import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/db/entities/users.entity';
import { HadnlersModule } from 'src/handlers/handlers.module';
import { JwtStrategy } from './jwt/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfigModule } from './jwt/jwt.config.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), JwtConfigModule, HadnlersModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
