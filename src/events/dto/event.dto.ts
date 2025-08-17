import { IsNotEmpty } from 'class-validator';
import { PayloadDto } from 'src/auth/dto/payload.dto';

export class EventDto {
  @IsNotEmpty()
  name: string;

  user?: PayloadDto;

  description: string;

  date: string;

  location: string;

  maxParticipants: number;
}
