import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  teapot(): string {
    return 'Move Along, Nothing to See Here';
  }
}
