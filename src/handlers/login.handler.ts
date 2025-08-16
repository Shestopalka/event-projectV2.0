import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login.dto';
import { IHandle } from 'src/interfaces/handler.interface';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/db/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoginHandler implements IHandle<LoginDto, void> {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}
  async handle(dto: LoginDto): Promise<void> {
    try {
      const existUser = await this.userRepository.findOne({
        where: {
          email: dto.email,
        },
      });
      if (!existUser) {
        throw new UnauthorizedException('User not found');
      }
      const isValidPassword = await bcrypt.compare(
        dto.password,
        existUser.password,
      );
      if (!isValidPassword) {
        throw new BadRequestException('Password not valid!');
      }
    } catch (err) {
      throw err;
    }
  }
}
