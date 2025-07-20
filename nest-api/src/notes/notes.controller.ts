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
    //TODO: Get all notes from DB
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
  getNotebyId(@Param('id') noteId: string): { note : Note | undefined } {
    //TODO: Get note by id from DB
    return {note: undefined};
  }

  //MARK: POST /newNote
  @Post('newNote')
  @Redirect('/notes')
  async createNote(@Body() body: { content: string }) {
    
    //TODO: SAVE NOTE ON DB


    // await this.rmqService.publishNote(newNote);
    return body;
  }
}
