import { ByCript } from 'src/commons/classes/bycript';
import { ResetPassword } from '../entities/reset-password.entity';
import { Helper } from 'src/commons/classes/helper';
import { DateHelper } from 'src/commons/classes/date-helper';

export class ResetPasswordFactory {
  constructor(
    private readonly userId: string,
    private readonly expiresIn: number,
  ) {}

  create(): Partial<ResetPassword> {
    return {
      token: this.getToken(),
      userId: this.userId,
      expiresIn: this.getExpiresIn(),
    };
  }

  private getToken(): string {
    return ByCript.hasSync(Helper.uuid()).replace(/[\/.,?\\+"ñ$#!¿¡:]/g, '');
  }

  private getExpiresIn() {
    return DateHelper.date().add(this.expiresIn, 'hours').toDate();
  }
}
