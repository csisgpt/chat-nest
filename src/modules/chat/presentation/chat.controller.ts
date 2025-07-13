import { Controller, Get } from '@nestjs/common';
import { Message } from '../domain/entities/message.entity';
import { ChatService } from '../application/services/chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('messages')
  async getMessages(): Promise<Message[]> {
    return this.chatService.getRecentMessages();
  }
}

