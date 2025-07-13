import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from '../application/dto/login.dto';
import { SignupDto } from '../application/dto/signup.dto';
import { AuthService } from '../application/services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, description: 'User registered' })
  async signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }
}
