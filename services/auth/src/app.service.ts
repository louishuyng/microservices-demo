import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthy(): string {
    return 'Healthy!';
  }
}
