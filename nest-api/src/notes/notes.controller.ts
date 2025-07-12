import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Render,
} from '@nestjs/common';
import { UUID } from 'crypto';

@Controller('notes')
export class NotesController {
  //MARK: GET /notes
  @Get()
  @Render('index')
  getAllNotes() {
    return;
  }

  //MARK: GET /newNote
  @Get('newNote')
  @Render('newNote')
  showCreateNoteForm() {
    return;
  }

  //MARK: GET /:noteId
  @Get(':id')
  @Render(':id')
  getNotebyId(@Param('id') id: UUID) {
    return;
  }

  //MARK: POST /newNote
  @Post('newNote')
  @Redirect('/')
  createNote(@Body() body: { content: string }) {
    return;
  }
}
