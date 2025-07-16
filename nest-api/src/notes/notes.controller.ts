import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Render,
} from '@nestjs/common';
import { Note } from './notes.entity'
import { response } from 'express';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';

@Controller('notes')
export class NotesController {
  constructor(private rmqService: RabbitMQService) { }
  //MARK: GET /notes
  @Get()
  @Render('index')
  getAllNotes(): { notes: Note[] } {
    const notes: Note[] = []; //This is a placeholder while i dont implement
    return { notes };
  }

  //MARK: GET /newNote
  @Get('newNote')
  @Render('newNote')
  showCreateNoteForm() {
    console.log(`Response status code: ${response.statusCode}`);
    return;
  }

  //MARK: GET /:noteId
  @Get(':id')
  @Render('noteDetail')
  getNotebyId(@Param('id') noteId: string): { note: Note; questions: { question: string; answer: string }[] } {
    const note: Note = {
      id: noteId,
      content: "This is some example note content that was saved earlier.",
      date: new Date()
    };

    const questions = [
      {
        question: "What is the main idea of this note?",
        answer: "The note describes how to set up Tailwind with NestJS."
      },
      {
        question: "Which CSS utility framework is used?",
        answer: "Tailwind CSS."
      }
    ];

    return { note, questions };
  }

  //MARK: POST /newNote
  @Post('newNote')
  @Redirect('/notes')
  async createNote(@Body() body: { content: string }) {
    
    //TODO: SAVE NOTE ON DB
    const newNote: Note = {
      id: "placeholderId",
      content: body.content,
      date: new Date()
    }

    await this.rmqService.publishNote(newNote);
    return body;
  }
}
