import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './presentation/auth.controller';
import { AuthService } from './application/services/auth.service';
import { JwtModule } from './infrastructure/jwt/jwt.module';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { UserPrismaRepository } from './infrastructure/prisma/user.prisma.repository';

@Module({
  imports: [ConfigModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserPrismaRepository],
})
export class AuthModule {}
