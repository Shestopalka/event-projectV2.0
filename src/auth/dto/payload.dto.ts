import { IsNotEmpty } from 'class-validator';

export class PayloadDto {
  @IsNotEmpty()
  sub: string;

  @IsNotEmpty()
  email: string;
}
