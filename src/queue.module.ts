import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import Redis from 'ioredis';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: () => ({
        redis: {
          host: process.env.REDIS_HOST,
          port: +process.env.REDIS_PORT,
          password: process.env.REDIS_PASSWORD,
        },
        prefix: '${sims}',
      }),
    }),
  ],
})
export class QueueModule {}
