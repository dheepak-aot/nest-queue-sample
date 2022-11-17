import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@bull-board/express';
import { Queue } from 'bull';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { Queues } from './queue.constant';
import * as basicAuth from 'express-basic-auth';
require('../env-setup');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/admin/queues');
  const bullBoardQueues = Object.values(Queues).map((queue) => {
    return new BullAdapter(app.get<Queue>(`BullQueue_${queue.name}`), {
      readOnlyMode: queue.readonly,
    });
  });
  createBullBoard({
    queues: bullBoardQueues,
    serverAdapter,
  });

  app.use(
    '/admin/queues',
    basicAuth({ users: { foo: 'bar' }, challenge: true }),
    serverAdapter.getRouter(),
  );
  await app.listen(3000);
}
bootstrap();
