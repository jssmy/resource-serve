import { ByCript } from '@commons/classes/bycript';
import { Helper } from '@commons/classes/helper';
import { DateHelper } from '@commons/classes/date-helper';
import { ConfirmAccount } from '../../confirm-account/entities/confirm-account.entity';

export class ConfirmAccountFactory {
  constructor(
    private readonly userId: string,
    private readonly expresIn: number,
  ) {}

  create(): Partial<ConfirmAccount> {
    return {
      userId: this.userId,
      token: this.getToken(),
      expiresIn: this.getExpiresIn(),
    };
  }

  private getExpiresIn() {
    return DateHelper.date().add(this.expresIn, 'hours').toDate();
  }

  private getToken(): string {
    return ByCript.hasSync(Helper.uuid()).replace(/[\/.,?\\+"ñ$#!¿¡:]/g, '');
  }
}
