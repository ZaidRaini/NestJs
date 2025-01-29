import { TodoStatus } from '@prisma/client';

enum TodoStatuss {
  PENDING,
  IN_PROGRESS,
  COMPLETED,
}

export interface TodoDto {
  title: string;
  description?: string;
  status: TodoStatus;
}

export interface updateTodoDto {
  title?: string;
  description?: string;
  status?: TodoStatuss;
}
