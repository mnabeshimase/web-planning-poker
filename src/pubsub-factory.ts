import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

export const pubSubFactory = {
  provide: 'PUB_SUB',
  useFactory: () => {
    const options = {
      host: 'localhost',
      port: 6379,
    };
    return new RedisPubSub({
      publisher: new Redis(options),
      subscriber: new Redis(options),
    });
  },
};
