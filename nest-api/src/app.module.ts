import { Module } from '@nestjs/common';
import { NotesController } from './notes/notes.controller';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true,
    })
  ],
  controllers: [NotesController],
  providers: [RabbitMQService],
})
export class AppModule {}
