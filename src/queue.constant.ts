import { QueueModel } from './queue.model';

type QueueProperties = Record<string, QueueModel>;

export const Queues = {
  ApplicationQueue: { name: 'application', readonly: true },
};
