import { Module } from '@nestjs/common';
import { NotesController } from './notes/notes.controller';

@Module({
  imports: [],
  controllers: [NotesController],
  providers: [],
})
export class AppModule {}
