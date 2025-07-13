import { Message } from '../entities/message.entity';

export const MESSAGE_REPOSITORY = 'MESSAGE_REPOSITORY';

export interface MessageRepository {
  create(data: { senderId: number; content: string }): Promise<Message>;
  findRecent(): Promise<Message[]>;
}
