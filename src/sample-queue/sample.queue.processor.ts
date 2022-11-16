import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Queues } from 'src/queue.constant';

@Processor(Queues.ApplicationQueue.name)
export class SampleProcessor {
  @Process()
  handleTranscode(job: Job) {
    console.log(job.name);
    console.log(job.data);
  }
}
