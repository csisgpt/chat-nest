import { Message } from './message.entity';

export interface MessageRepository {
  save(message: Message): Promise<Message>;
  findRecent(): Promise<Message[]>;
}

