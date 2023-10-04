// queue.ts
import Queue from 'bee-queue';
import redis from 'redis';

const sharedConfig = {
  redis: redis.createClient(),
};

const matchingQueue = new Queue('matching', sharedConfig);

export default matchingQueue;
