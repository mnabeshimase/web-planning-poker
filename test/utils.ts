import { Repository } from 'typeorm';

export type MockRepository<T = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;
export const createMockRepository = <T = any>(): MockRepository<T> => ({
  create: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  preload: jest.fn(),
  remove: jest.fn(),
  save: jest.fn(),
});
