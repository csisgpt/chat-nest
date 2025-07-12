import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '../application/dto/login.dto';
import { SignupDto } from '../application/dto/signup.dto';
import { AuthService } from '../application/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }
}
