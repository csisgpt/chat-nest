import { Inject, Injectable } from '@nestjs/common';
import { SendMessageDto } from '../dto/send-message.dto';
import { Message } from '../../domain/entities/message.entity';
import { MESSAGE_REPOSITORY, MessageRepository } from '../../domain/interfaces/message-repository.interface';

@Injectable()
export class ChatService {
  constructor(
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepo: MessageRepository,
  ) {}

  async sendMessage(dto: SendMessageDto): Promise<Message> {
    return this.messageRepo.create({ senderId: dto.senderId, content: dto.content });
  }

  async getRecentMessages(): Promise<Message[]> {
    return this.messageRepo.findRecent();
  }
}
