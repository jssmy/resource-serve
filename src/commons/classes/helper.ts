import { v4 as uuidv4 } from 'uuid';

export class Helper {
  static uuid(): string {
    return uuidv4();
  }
}
