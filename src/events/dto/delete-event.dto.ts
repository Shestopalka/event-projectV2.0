import { IsNotEmpty } from 'class-validator';
import { PayloadDto } from 'src/auth/dto/payload.dto';

export class DeleteEventDto {
  @IsNotEmpty()
  name: string;
  user: number;
}
