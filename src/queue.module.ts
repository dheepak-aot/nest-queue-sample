import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import Redis from 'ioredis';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: () => ({
        createClient: () => {
          if (process.env.NODE_ENV === 'production') {
            return new Redis.Cluster(
              [{ host: process.env.REDIS_HOST, port: +process.env.REDIS_PORT }],
              { redisOptions: { password: process.env.REDIS_PASSWORD } },
            );
          }
          return new Redis({
            host: process.env.REDIS_HOST,
            port: +process.env.REDIS_PORT,
            password: process.env.REDIS_PASSWORD,
            enableReadyCheck: null,
            maxRetriesPerRequest: null,
          });
        },
        prefix: '${sims}',
      }),
    }),
  ],
})
export class QueueModule {}
