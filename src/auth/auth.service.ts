import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/db/entities/users.entity';
import { Repository } from 'typeorm';
import { RegistrationDto } from './dto/registration.dto';
import { RegistrationHandler } from 'src/handlers/authHandlers/registration.handler';
import { JwtService } from '@nestjs/jwt';
import { GetJwtToken } from 'src/handlers/authHandlers/getJwtToken.handler';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { LoginHandler } from 'src/handlers/authHandlers/login.handler';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly registrationHandler: RegistrationHandler,
    private readonly loginHandler: LoginHandler,
    private readonly getJwtToken: GetJwtToken,
  ) {}

  async registration(registrationDto: RegistrationDto) {
    try {
      await this.registrationHandler.handle(registrationDto);

      const hashPassword = await bcrypt.hash(registrationDto.password, 10);
      const user = await this.usersRepository.save({
        email: registrationDto.email,
        username: registrationDto.username,
        password: hashPassword,
      });
      console.log(user);

      const access_token = await this.getJwtToken.handle({
        userId: user.id,
        email: user.email,
      });

      return {
        message: 'Registration succesfuly!',
        access_token: access_token,
      };
    } catch (err) {
      throw err;
    }
  }
  async login(loginDto: LoginDto) {
    try {
      const user = await this.loginHandler.handle(loginDto);
      const access_token = await this.getJwtToken.handle({
        userId: user,
        email: loginDto.email,
      });
      return { access_token: access_token, message: 'login succesfuly!' };
    } catch (err) {
      throw err;
    }
  }
}
