import { Inject, Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { SignupDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';
import { User } from '../../domain/entities/user.entity';
import { USER_REPOSITORY, UserRepository } from '../../domain/interfaces/user-repository.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  private generateTokens(user: User) {
    const payload = { sub: user.id, email: user.email, username: user.username };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = randomBytes(20).toString('hex');
    return { accessToken, refreshToken };
  }

  async signup(dto: SignupDto) {
    const existing = await this.userRepo.findByEmail(dto.email);
    if (existing) {
      throw new BadRequestException('Email already in use');
    }
    const hashed = await bcrypt.hash(dto.password, 10);
    const userToCreate: User = {
      id: undefined as any,
      email: dto.email,
      username: dto.username,
      password: hashed,
    };
    const created = await this.userRepo.create(userToCreate);
    const tokens = this.generateTokens(created);
    return {
      ...tokens,
      user: { id: created.id, email: created.email, username: created.username },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const tokens = this.generateTokens(user);
    return {
      ...tokens,
      user: { id: user.id, email: user.email, username: user.username },
    };
  }
}
