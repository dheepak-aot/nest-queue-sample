import { Controller, Get } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('application')
export class AppController {
  constructor(@InjectQueue('sample') private readonly sampleQueue: Queue) {}

  @Get()
  async getHello(): Promise<void> {
    console.log('Controlled invoked');
    await this.sampleQueue.add({ message: 'hello' });
  }
}
