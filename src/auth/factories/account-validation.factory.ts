import { ByCript } from 'src/commons/classes/bycript';
import { AccountValidation } from '../entities/account-validation.entity';
import { Helper } from 'src/commons/classes/helper';
import { DateHelper } from 'src/commons/classes/date-helper';

export class AccountValidationFactory {
  constructor(
    private readonly userId: string,
    private readonly expresIn: number,
  ) {}

  create(): Partial<AccountValidation> {
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
