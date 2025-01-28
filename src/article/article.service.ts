import { Injectable } from '@nestjs/common';
import { DatabaseServices } from 'src/database/database.service';
import { PostDto, UpdatePostDto } from './Dto/Dto';

@Injectable()
export class ArticleService {
  constructor(private readonly databaseServices: DatabaseServices) {}
  async getAllArticle(date: string, tags: string) {
    const where: any = {};
    if (date) {
      const parsedDate = new Date(date);
      console.log(parsedDate);
      if (!isNaN(parsedDate.getTime())) {
        where.date = {
          gte: parsedDate,
        };
      }
    }
    if (tags) {
      where.tags = {
        has: tags,
      };
    }

    return this.databaseServices.article.findMany({
      where,
    });
  }

  async getArticleById(id: string) {
    return this.databaseServices.article.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async updateArticle(id: string, updateData: UpdatePostDto) {
    return this.databaseServices.article.update({
      where: { id: parseInt(id) },
      data: {
        title: updateData.title,
        content: updateData.content,
        author: updateData.author,
        tags: updateData.tags,
        date: new Date(updateData.date),
      },
    });
  }

  async createArticle(body: PostDto | PostDto[]) {
    if (Array.isArray(body)) {
      return this.databaseServices.article.createMany({
        data: body.map((article) => ({
          title: article.title,
          content: article.content,
          author: article.author,
          tags: article.tags,
          date: new Date(article.date),
        })),
      });
    } else {
      return this.databaseServices.article.create({
        data: {
          title: body.title,
          content: body.content,
          author: body.author,
          tags: body.tags,
          date: new Date(body.date),
        },
      });
    }
  }

  async deleteArticle(id: string) {
    return this.databaseServices.article.delete({
      where: { id: parseInt(id) },
    });
  }
}
