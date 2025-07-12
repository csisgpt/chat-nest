import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from '../application/dto/login.dto';
import { SignupDto } from '../application/dto/signup.dto';

@Controller('auth')
export class AuthController {
  @Post('login')
  async login(@Body() dto: LoginDto) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto) {}
}

