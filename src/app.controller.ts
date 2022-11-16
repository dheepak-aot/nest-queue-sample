import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Queues } from './queue.constant';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectQueue(Queues.ApplicationQueue.name)
    private readonly applicationQueue: Queue,
    @InjectQueue(Queues.ApplicationQueue.name)
    private readonly assessmentQueue: Queue,
  ) {}

  @Get('application')
  async invokeApplication(): Promise<void> {
    await this.applicationQueue.add({ message: 'hello' });
  }

  @Get('assessment')
  async invokeAssessment(): Promise<void> {
    console.log('Controlled invoked');
    await this.assessmentQueue.add({ message: 'hello' });
  }
}
