import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SampleQueueProcessorModule } from './sample-queue/sample.queue.processor.module';
import { QueueRegistryModule } from './queue.registry.module';
import { QueueModule } from './queue.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    QueueModule,
    QueueRegistryModule,
    SampleQueueProcessorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
