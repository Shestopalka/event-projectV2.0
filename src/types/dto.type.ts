import { LoginDto } from 'src/auth/dto/login.dto';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { RegistrationDto } from 'src/auth/dto/registration.dto';

export type IDto = RegistrationDto | PayloadDto | LoginDto;
