import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { validateOrReject } from 'class-validator';
import { WsException } from '@nestjs/websockets';
import { ChatService } from '../../application/services/chat.service';
import { SendMessageDto } from '../../application/dto/send-message.dto';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {}

  handleDisconnect(client: Socket) {}

  @SubscribeMessage('send_message')
  async handleSendMessage(
    @MessageBody() payload: SendMessageDto,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    try {
      await validateOrReject(payload);
    } catch (e) {
      throw new WsException('Validation failed');
    }
    const message = await this.chatService.sendMessage(payload);
    this.server.emit('message_received', message);
  }

  @SubscribeMessage('ping')
  handlePing(): string {
    return 'pong';
  }
}

