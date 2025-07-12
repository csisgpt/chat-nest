import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { SignupDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';
import { UserRepository } from '../../domain/interfaces/user-repository.interface';
import { User } from '../../domain/entities/user.entity';
import { JwtPayload } from '../../infrastructure/jwt/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UserRepository,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async signup(dto: SignupDto): Promise<{ id: string; username: string; email: string }> {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user: User = {
      id: undefined as any,
      username: dto.username,
      email: dto.email,
      password: hashed,
    };
    const created = await this.users.create(user);
    return { id: created.id, username: created.username, email: created.email };
  }

  private async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.users.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);
    const payload: JwtPayload = { sub: user.id, email: user.email };
    const accessToken = await this.jwt.signAsync(payload, {
      secret: this.config.get<string>('jwt.accessTokenSecret'),
      expiresIn: this.config.get<string>('jwt.accessTokenExpiry'),
    });
    const refreshToken = await this.jwt.signAsync(payload, {
      secret: this.config.get<string>('jwt.refreshTokenSecret'),
      expiresIn: this.config.get<string>('jwt.refreshTokenExpiry'),
    });
    return {
      accessToken,
      refreshToken,
      user: { id: user.id, username: user.username, email: user.email },
    };
  }
}
