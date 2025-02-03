import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post('grammar')
  async checkGrammer(@Body() body: { text: string }) {
    console.log(body.text);
    return this.noteService.checkGrammer(body.text);
  }

  @Post('save')
  saveNote(@Body('title') title: string, @Body('content') content: string) {
    return this.noteService.saveNote(title, content);
  }

  @Get('render/:title')
  renderMarkdown(@Param('title') title: string) {
    return this.noteService.renderMarkdown(title);
  }
}
