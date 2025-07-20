import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Redirect,
  Render,
} from '@nestjs/common';
import { Note } from './notes.entity'
import { response } from 'express';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { AppDataSource } from '../database/data-source';

@Controller('notes')
export class NotesController {
  constructor(private rmqService: RabbitMQService) { }

  //MARK: GET /notes
  @Get()
  @Render('index')
  async getAllNotes(): Promise<{ notes: Note[]; }> {
    try {
      const notes = await AppDataSource.query('SELECT * FROM note')
      return {notes}
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
  async getNotebyId(@Param('id') noteId: string): Promise<{ note: Note; }> {
    try {
      const notes = (await AppDataSource.manager.findBy(Note, { id: noteId }))
      if (notes.length == 0) {
        throw new NotFoundException('There is no note with this id')
      }
      return { note: notes[0] }
    } catch (error) {
      console.log("DEBUG: FAILED TO FETCH NOTES -> ", error)
      throw new InternalServerErrorException('Unexpected error');
    }
  }

  //MARK: POST /newNote
  @Post('newNote')
  @Redirect('/notes')
  async createNote(@Body() body: { content: string }) {
    try {
      const newNote = AppDataSource.manager.create(Note, {
        content: body.content,
        date: new Date(),
      });

      await AppDataSource.manager.save(Note, newNote);

      await this.rmqService.publishNote(newNote);

      return {}; // redireciona para /notes
    } catch (error) {
      console.error('Failed to create note:', error);
      throw new InternalServerErrorException('Could not create the note.');
    }
  }
}
