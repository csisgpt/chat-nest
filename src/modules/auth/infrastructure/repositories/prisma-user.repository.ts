import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user.repository';
import { User } from '../../domain/user.entity';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return null;
  }

  async create(user: User): Promise<User> {
    return user;
  }
}

