import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

export const pubSubToken = 'PUB_SUB';

export const pubSubFactory = {
  provide: pubSubToken,
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
