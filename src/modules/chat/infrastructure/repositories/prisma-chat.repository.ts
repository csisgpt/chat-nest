import { Injectable } from '@nestjs/common';
import { MessageRepository } from '../../domain/message.repository';
import { Message } from '../../domain/message.entity';

@Injectable()
export class PrismaChatRepository implements MessageRepository {
  async save(message: Message): Promise<Message> {
    return message;
  }

  async findRecent(): Promise<Message[]> {
    return [];
  }
}

