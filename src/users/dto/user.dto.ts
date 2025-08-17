import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  userId?: number;
  email?: string;
  userName?: string;
}
