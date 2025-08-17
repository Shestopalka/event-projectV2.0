import { IsNotEmpty } from 'class-validator';
import { PayloadDto } from 'src/auth/dto/payload.dto';

export class RegistrationInEventDto {
  @IsNotEmpty()
  user: PayloadDto;
  name: string;
}
