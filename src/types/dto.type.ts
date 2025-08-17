import { LoginDto } from 'src/auth/dto/login.dto';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { RegistrationDto } from 'src/auth/dto/registration.dto';
import { EventDto } from 'src/events/dto/event.dto';
import { UserDto } from 'src/users/dto/user.dto';

export type IDto = RegistrationDto | PayloadDto | LoginDto | EventDto | UserDto;
