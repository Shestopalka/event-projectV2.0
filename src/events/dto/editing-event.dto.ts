import { IsNotEmpty } from 'class-validator';
import { PayloadDto } from 'src/auth/dto/payload.dto';

export class EditingEventDto {
  @IsNotEmpty()
  name: string;

  user?: PayloadDto;
  updateData: {
    description?: string;

    name?: string;

    location?: string;

    maxParticipants?: number;

    date?: string;
  };
}
