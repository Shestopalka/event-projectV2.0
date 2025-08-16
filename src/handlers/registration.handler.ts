import { BadRequestException, Injectable } from '@nestjs/common';
import { RegistrationDto } from 'src/auth/dto/registration.dto';
import { IHandle } from 'src/interfaces/handler.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/db/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegistrationHandler implements IHandle<RegistrationDto> {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepositiry: Repository<Users>,
  ) {}

  async handle(dto: RegistrationDto) {
    try {
      const existUser = await this.usersRepositiry.findOne({
        where: {
          email: dto.email,
        },
      });
      console.log('this exisrtUser', existUser);

      if (existUser) {
        throw new BadRequestException(
          'The user with this email is already registered.',
        );
      }
    } catch (err) {
      console.log(err);

      throw err;
    }
  }
}
