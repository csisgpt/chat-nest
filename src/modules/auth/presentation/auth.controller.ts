import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '../application/dto/login.dto';
import { SignupDto } from '../application/dto/signup.dto';
import { AuthService } from '../application/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    await this.authService.signup(dto);
    return { success: true };
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
