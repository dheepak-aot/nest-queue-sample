import { Module } from '@nestjs/common';
import { SampleProcessor } from './sample.queue.processor';

@Module({
  providers: [SampleProcessor],
})
export class SampleQueueProcessorModule {}
