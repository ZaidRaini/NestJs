export class PostDto {
  title: string;
  content: string;
  author: string;
  tags: string[];
  date: string; // ISO date format
}

export class UpdatePostDto {
  title?: string; // Optional
  content?: string; // Optional
  author?: string; // Optional
  tags?: string[]; // Optional
  date?: string; // Optional
}
