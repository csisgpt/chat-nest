import { Controller, Get } from '@nestjs/common';
import { Message } from '../domain/message.entity';

@Controller('chat')
export class ChatController {
  @Get('messages')
  async getMessages(): Promise<Message[]> {
    return [];
  }
}

