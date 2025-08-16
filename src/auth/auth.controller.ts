import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  async sayHello() {
    return 'Hello world!';
  }

  @Post('registration')
  async registrationUser(@Body() registrationDto: RegistrationDto) {
    return await this.authService.registration(registrationDto);
  }

  @Post('login')
  async loginUser(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
