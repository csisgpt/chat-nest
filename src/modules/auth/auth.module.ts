import { Module } from '@nestjs/common';
import { AuthController } from './presentation/auth.controller';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';

@Module({
  controllers: [AuthController],
  providers: [JwtStrategy, PrismaUserRepository],
})
export class AuthModule {}

