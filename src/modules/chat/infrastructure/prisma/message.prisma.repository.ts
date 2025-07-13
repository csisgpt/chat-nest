import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Message } from '../../domain/entities/message.entity';
import { MessageRepository } from '../../domain/interfaces/message-repository.interface';

@Injectable()
export class MessagePrismaRepository implements MessageRepository {
  private prisma = new PrismaClient();

  async create(data: { senderId: number; content: string }): Promise<Message> {
    const created = await this.prisma.message.create({
      data: {
        senderId: data.senderId,
        content: data.content,
      },
    });
    return created as Message;
  }

  async findRecent(): Promise<Message[]> {
    const messages = await this.prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return messages as Message[];
  }
}
