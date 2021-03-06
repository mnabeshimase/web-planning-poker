import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  create(name: string) {
    return { name };
  }
}
