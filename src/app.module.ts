import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ArticleModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
