// redis.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly client: Redis.Redis;

  constructor(private readonly configService: ConfigService) {
    const host = this.configService.get('REDIS_HOST');
    const port = this.configService.get('REDIS_PORT');
    const password = this.configService.get('REDIS_PASSWORD');
    this.client = new Redis.default({
      host: host,
      port: port,
      password: password,
      lazyConnect: true,
      keepAlive: 1000,
    });
    this.client.connect().catch((e) => console.log(e));
  }

  getClient(): Redis.Redis {
    return this.client;
  }
}
