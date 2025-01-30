import { Injectable } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  private client: RedisClientType;
  constructor() {
    this.client = createClient({
      url: `redis://localhost:6379`,
    });
    this.client.connect();
  }

  async set(key: string, value: string) {
    return await this.client.set(key, value);
  }

  async get(key: string) {
    return await this.client.get(key);
  }
}
