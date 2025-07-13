import { Controller, Get } from '@nestjs/common';
import { Message } from '../domain/entities/message.entity';
import { ChatService } from '../application/services/chat.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('chat')
@ApiBearerAuth()
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('messages')
  @ApiOperation({ summary: 'List recent messages' })
  @ApiResponse({ status: 200, description: 'Array of recent messages' })
  async getMessages(): Promise<Message[]> {
    return this.chatService.getRecentMessages();
  }
}

