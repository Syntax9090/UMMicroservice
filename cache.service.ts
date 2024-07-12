// cache.service.ts
import { Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';

@Injectable()
export class CacheService {
  private readonly redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: 'localhost',
      port: 6379,
    });
  }

  async get(key: string): Promise<any> {
    return await this.redis.get(key);
  }

  async set(key: string, value: any, ttl: number): Promise<void> {
    await this.redis.set(key, JSON.stringify(value));
    await this.redis.expire(key, ttl);
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }
}