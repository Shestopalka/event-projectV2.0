import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/db/entities/users.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async getUser(userDto: UserDto) {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          id: userDto.userId,
        },
      });
      if (!user) throw new BadGatewayException('User not found');

      return user;
    } catch (err) {
      throw err;
    }
  }
  async deleteUser(userDto: UserDto) {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          id: userDto.userId,
        },
      });
      if (!user) throw new BadGatewayException('User not found');
      await this.usersRepository.delete(user?.id);
    } catch (err) {}
  }
}
