import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { RoadmapModule } from './roadmap/roadmap.module';

@Module({
  imports: [RoadmapModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
