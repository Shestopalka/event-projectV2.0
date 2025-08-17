import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { IHandle } from 'src/interfaces/handler.interface';

@Injectable()
export class GetJwtToken implements IHandle<PayloadDto, string> {
  constructor(private readonly jwtService: JwtService) {}

  async handle(dto: PayloadDto) {
    try {
      const access_token = await this.jwtService.sign(dto);
      return access_token;
    } catch (err) {
      throw err;
    }
  }
}
