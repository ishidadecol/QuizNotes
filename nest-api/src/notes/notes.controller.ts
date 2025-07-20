import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Redirect,
  Render,
} from '@nestjs/common';
import { Note } from './notes.entity'
import { response } from 'express';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';
import { DataSource } from 'typeorm';

@Controller('notes')
export class NotesController {
  constructor(private rmqService: RabbitMQService, private db: DataSource) { }

  //MARK: GET /notes
  @Get()
  @Render('index')
  async getAllNotes(): Promise<{ notes: Note[]; }> {
    try {
      const notes = await this.db.manager.query('SELECT * FROM note')
      return notes
    } catch (error) {
      console.log("DEBUG: FAILED TO FETCH NOTES -> ", error)
      throw new InternalServerErrorException('Unexpected error');
    }
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
  getNotebyId(@Param('id') noteId: string): { note: Note | undefined } {
    //TODO: Get note by id from DB
    return { note: undefined };
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
