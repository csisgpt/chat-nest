import { Module } from '@nestjs/common';
import { AuthController } from './presentation/auth.controller';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { JwtConfigModule } from './infrastructure/jwt/jwt.module';
import { AuthService } from './application/services/auth.service';
import { UserPrismaRepository } from './infrastructure/prisma/user.prisma.repository';
import { USER_REPOSITORY } from './domain/interfaces/user-repository.interface';

@Module({
  imports: [JwtConfigModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    { provide: USER_REPOSITORY, useClass: UserPrismaRepository },
  ],
})
export class AuthModule {}
