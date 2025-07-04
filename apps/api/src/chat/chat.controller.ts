import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post()
  async handleChat(@Body('userMessage') userMessage: string) {
    const roadmap = await this.chatService.generateRoadmap(userMessage);
    return { roadmap };
  }
}
