import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto, updateTodoDto } from './Dto/todo.Dto';
import { TodolistGuard } from 'src/todolist/todolist.guard';

@Controller('todo')
@UseGuards(TodolistGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllTodo(@Query('status') status: string, @Request() req) {
    const { sub } = req.user;
    return this.todoService.getAllTodo(sub, status);
  }

  @Get(':id')
  gerTodoWithId(@Param('id') id: string, @Request() req) {
    const { sub } = req.user;

    return this.todoService.getTodoWithId(+id, sub);
  }

  @Post()
  createTodo(@Body() body: TodoDto, @Request() req) {
    const { sub, email } = req.user;
    console.log(sub, email);
    return this.todoService.createTodo(sub, body);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string, @Request() req) {
    const { sub } = req.user;
    return this.todoService.deleteTodo(+id, sub);
  }

  @Put(':id')
  updateTodo(
    @Param('id') id: number,
    @Body() body: updateTodoDto,
    @Request() req,
  ) {
    const { sub, email } = req.user;
    console.log(email);
    return this.todoService.updateTodo(sub, id, body);
  }
}
