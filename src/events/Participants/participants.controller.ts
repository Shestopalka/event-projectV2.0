import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { RegistrationInEventDto } from './dto/registration-event.dto';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participiantsService: ParticipantsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('register')
  async registerUserForEvent(
    @GetUser() user,
    @Body() dto: RegistrationInEventDto,
  ) {
    dto.user = user;
    return await this.participiantsService.registrationInEvent(dto);
  }
}
