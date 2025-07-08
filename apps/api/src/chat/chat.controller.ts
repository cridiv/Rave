import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

@Post()
async handleChat(@Body('userMessage') userMessage: string) {
  try {
    const roadmap = await this.chatService.generateRoadmap(userMessage);
    console.log('🎯 ROADMAP GENERATED:', JSON.stringify(roadmap, null, 2));
    console.log('🔍 ROADMAP TYPE:', typeof roadmap);
    console.log('📊 IS ARRAY:', Array.isArray(roadmap));
    
    return { roadmap }; // Wrap in an object
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate roadmap';
    console.log('❌ ERROR:', errorMessage);
    return { 
      error: errorMessage 
    };
  }
}
}
