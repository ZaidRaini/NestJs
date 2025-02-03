import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as MarkdownIt from 'markdown-it';
import * as fs from 'fs';
import axios from 'axios';

@Injectable()
export class NoteService {
  private noteDir = path.join(__dirname, '..', 'notes');

  constructor() {
    if (!fs.existsSync(this.noteDir)) {
      fs.mkdirSync(this.noteDir);
      // if file is not exists then create
    }
  }

  // save markdown note
  saveNote(title: string, content: string) {
    const filePath = path.join(this.noteDir, `${title}.md`);
    fs.writeFileSync(filePath, content, 'utf-8');
    return { message: 'Note saved successfully', title };
  }

  // Convert Markdown to HTML
  renderMarkdown(title: string): { html: string } {
    const filePath = path.join(this.noteDir, `${title}.md`);
    if (!fs.existsSync(filePath)) {
      throw new Error('Note not found');
    }

    const markdownContent = fs.readFileSync(filePath, 'utf-8');
    const md = new MarkdownIt();
    return { html: md.render(markdownContent) };
  }

  // check grammer
  async checkGrammer(text: string): Promise<any> {
    try {
      const response = await axios.post(
        'https://api.languagetool.org/v2/check',
        new URLSearchParams({ text, language: 'en-US' }).toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      );
      return { message: response.data.matches[0].message };
    } catch (error) {
      console.log(error);
      throw new Error('Grammar check failed');
    }
  }
}
