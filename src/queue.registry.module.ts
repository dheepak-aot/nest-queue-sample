import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { getQueueModules } from './queue.util';

@Module({
  imports: [BullModule.registerQueue(...getQueueModules())],
  exports: [BullModule.registerQueue(...getQueueModules())],
})
export class QueueRegistryModule {}
