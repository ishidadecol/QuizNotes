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

@Controller('notes')
export class NotesController {
  //MARK: GET /notes
  @Get()
  @Render('index')
  getAllNotes() : {notes : Note[]}{
    const notes : Note[] = []; //This is a placeholder while i dont implement
    return {notes};
  }

  //MARK: GET /newNote
  @Get('newNote')
  @Render('newNote')
  showCreateNoteForm() {
    return;
  }

  //MARK: GET /:noteId
  @Get(':id')
  @Render('note')
  getNotebyId(@Param('id') noteId: string) : {note : Note}{
    const note : Note = {id: noteId, content: "Dummy data", date: new Date()} ;
    return { note };
  }

  //MARK: POST /newNote
  @Post('newNote')
  @Redirect('/')
  createNote(@Body() body: { content: string}) {
    return body;
  }
}
