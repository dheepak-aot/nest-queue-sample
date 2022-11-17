import { Module } from '@nestjs/common';
import { BullModule, BullRootModuleOptions } from '@nestjs/bull';
import Redis, { Cluster, RedisOptions } from 'ioredis';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: createConnectionFactory,
    }),
  ],
})
export class QueueModule {}

function createConnectionFactory():
  | Promise<BullRootModuleOptions>
  | BullRootModuleOptions {
  const redisConnectionOptions: RedisOptions = {
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  };
  if (process.env.REDIS_CLUSTER_ENABLED === 'true') {
    return {
      createClient: (): Redis | Cluster => {
        return new Redis.Cluster(
          [
            {
              host: redisConnectionOptions.host,
              port: redisConnectionOptions.port,
            },
          ],
          { redisOptions: { password: process.env.REDIS_PASSWORD } },
        );
      },
      prefix: '${sims}',
    };
  }
  return {
    redis: redisConnectionOptions,
  };
}
