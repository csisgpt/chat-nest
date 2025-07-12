import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/interfaces/user-repository.interface';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  private prisma = new PrismaClient();

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? (user as User) : null;
  }

  async create(user: User): Promise<User> {
    const created = await this.prisma.user.create({
      data: { email: user.email, username: user.username, password: user.password },
    });
    return created as User;
  }
}
