import { Module } from '@nestjs/common';
import { ChatGateway } from './infrastructure/gateways/chat.gateway';
import { PrismaChatRepository } from './infrastructure/repositories/prisma-chat.repository';
import { ChatController } from './presentation/chat.controller';

@Module({
  providers: [ChatGateway, PrismaChatRepository],
  controllers: [ChatController],
})
export class ChatModule {}

