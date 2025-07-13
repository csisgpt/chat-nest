import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SendMessageDto {
  @IsNumber()
  senderId: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}
