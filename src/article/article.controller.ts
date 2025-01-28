import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { PostDto, UpdatePostDto } from './Dto/Dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articalService: ArticleService) {}

  @Get('all')
  findALl(
    @Query('date') date: string = '',
    @Query('tags') tags: string = '',
  ): Promise<
    {
      id: number;
      title: string;
      content: string;
      author: string;
      tags: string[];
      date: Date;
    }[]
  > {
    return this.articalService.getAllArticle(date, tags);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.articalService.getArticleById(id);
  }

  @Put(':id')
  updateArtical(@Param('id') id: string, @Body() updateArticle: UpdatePostDto) {
    return this.articalService.updateArticle(id, updateArticle);
  }

  @Delete(':id')
  deleteArtical(@Param('id') id: string) {
    return this.articalService.deleteArticle(id);
  }

  @Post()
  createArtical(@Body() postData: PostDto) {
    return this.articalService.createArticle(postData);
  }
}
