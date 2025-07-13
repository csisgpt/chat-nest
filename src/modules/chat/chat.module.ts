import { Module } from '@nestjs/common';
import { ChatGateway } from './infrastructure/gateways/chat.gateway';
import { MessagePrismaRepository } from './infrastructure/prisma/message.prisma.repository';
import { ChatController } from './presentation/chat.controller';
import { ChatService } from './application/services/chat.service';
import { MESSAGE_REPOSITORY } from './domain/interfaces/message-repository.interface';

@Module({
  providers: [
    ChatGateway,
    ChatService,
    { provide: MESSAGE_REPOSITORY, useClass: MessagePrismaRepository },
  ],
  controllers: [ChatController],
})
export class ChatModule {}

