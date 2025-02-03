import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { NoteModule } from './note/note.module';

@Module({
  imports: [UploadModule, NoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
