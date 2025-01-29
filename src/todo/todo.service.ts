import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { TodoDto, updateTodoDto } from './Dto/todo.Dto';
import { TodoStatus } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private readonly database: PrismaService) {}

  async getAllTodo(userId: string, status: string) {
    return await this.database.todo.findMany({
      where: {
        userId,
        status: status ? (status as TodoStatus) : undefined,
      },
    });
  }

  async getTodoWithId(id: number, userId: string) {
    return await this.database.todo.findUnique({
      where: {
        userId,
        id,
      },
    });
  }

  async deleteTodo(id: number, userId: string) {
    const todo = await this.database.todo.findUnique({ where: { id } });
    if (!todo) {
      throw new Error('Todo not found');
    }
    if (todo.userId !== userId) {
      throw new Error('Unauthorized: You can only delete your own todos');
    }
    return await this.database.todo.delete({ where: { id } });
  }

  async updateTodo(userId: string, id: number, body: updateTodoDto) {
    const updateData: any = {};
    console.log(id);
    if (body.title) updateData.title = body.title;
    if (body.description) updateData.description = body.description;
    if (body.status) updateData.status = body.status;

    return this.database.todo.update({
      where: { userId, id: +id },
      data: {
        title: updateData.title,
        description: updateData.description,
        status: updateData.status.toUpperCase(),
      },
    });
  }

  async createTodo(id: string, bodyData: TodoDto) {
    const statusValue = bodyData.status.toUpperCase();
    if (!statusValue) {
      return;
    }
    return await this.database.todo.create({
      data: {
        title: bodyData.title,
        description: bodyData.description,
        status: statusValue as TodoStatus,
        userId: id,
      },
    });
  }
}
